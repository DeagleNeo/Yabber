const User = require("../models/user");
const Channel = require("../models/channel");
const Message = require("../models/message");
const Organization = require("../models/organization");
const ChannelActivity = require("../models/channelActivity");
const generateFullName = require("../utils/generateFullName");
const {
  getLastMessage,
  addMsg,
  batchGetLastMessage,
} = require("./message.service");
const membersJoinSocketChannel = require("../socketIO/membersJoinSocketChannel");
const sendWelcomeMsgToChannel = require("../socketIO/sendWelcomeMsgToChannel");
const sendNewChannelNotification = require("../socketIO/sendNewChannelNotice");
const { batchGetUnreadMsgNumbers } = require("./channelActivity.service");

async function getChannelSummary({ userId, orgId }) {
  const { channels } = await User.findById(userId).exec();
  // return empty array if user is not in any channel
  if (channels.length === 0) return [];

  const detailedChannels = await Channel.find({
    _id: { $in: channels },
    isDM: false,
    organization: orgId,
  })
    .select("name isPrivate isDM avatar organization")
    .populate({
      path: "members",
      select: "firstName lastName avatar",
    })
    .lean();

  // create array of ObjectIds for aggregate
  const groupChannelsObjectIdArray = detailedChannels.map(({ _id }) => _id);
  // returns a Map. The key is channel id (string) value is the message object
  const lastMessageMap = await batchGetLastMessage(groupChannelsObjectIdArray);
  // returns a Map. The key is channel id (string) value is a number.
  //There won't be an entry if the number is zero.
  const unreadMessageNumberMap = await batchGetUnreadMsgNumbers(
    userId,
    groupChannelsObjectIdArray
  );

  for (const channel of detailedChannels) {
    const channelId = channel._id.toString();
    channel.lastMessage = lastMessageMap.get(channelId) || {
      note: "no message in this channel",
    };
    channel.notification = unreadMessageNumberMap.get(channelId) || 0;
  }

  // sort channels by last message time, latest first
  detailedChannels.sort((a, b) => {
    a.lastMessage.time = a.lastMessage.time || new Date("1990-01-01");
    b.lastMessage.time = b.lastMessage.time || new Date("1990-01-01");
    return b.lastMessage.time - a.lastMessage.time;
  });
  return detailedChannels;
}

async function getDmSummary({ userId, orgId }) {
  const { channels } = await User.findById(userId).exec();
  // return empty array if user is not in any channel
  if (channels.length === 0) return [];

  const detailedChannels = await Channel.find({
    _id: { $in: channels },
    isDM: true,
    organization: orgId,
  })
    .select("name isDM organization")
    .populate({
      path: "members",
      select: "firstName lastName avatar",
    })
    .lean();

  const dmChannelsObjectIdArray = detailedChannels.map(({ _id }) => _id);

  const lastMessageMap = await batchGetLastMessage(dmChannelsObjectIdArray);
  const unreadMessageNumberMap = await batchGetUnreadMsgNumbers(
    userId,
    dmChannelsObjectIdArray
  );

  for (const channel of detailedChannels) {
    const channelId = channel._id.toString();
    channel.lastMessage = lastMessageMap.get(channelId) || {
      note: "no message in this channel",
    };
    channel.notification = unreadMessageNumberMap.get(channelId) || 0;

    //the following code is to make dm channel appear like a user
    const displayUser =
      userId.valueOf() === channel.members[0]._id.valueOf()
        ? channel.members[1]
        : channel.members[0];

    channel.name = generateFullName(displayUser);
    channel.avatar = displayUser.avatar;
    channel.statusId = displayUser._id; //for display online status
    delete channel.members; //the members property is not required in front end
  }

  // sort channels by last message time, latest first
  detailedChannels.sort((a, b) => {
    a.lastMessage.time = a.lastMessage.time || new Date("1990-01-01");
    b.lastMessage.time = b.lastMessage.time || new Date("1990-01-01");
    return b.lastMessage.time - a.lastMessage.time;
  });
  return detailedChannels;
}

async function getOtherChannels({ userId, orgId }) {
  const { channels: userChannels, organization } = await User.findById(
    userId
  ).exec();

  // const { channels: publicChannels, members } = await Organization.findById(
  //   organization[0]
  // )
  //   .populate({
  //     path: "channels",
  //     select: "name isPrivate",
  //     match: { isPrivate: false },
  //   })
  //   .populate({
  //     path: "members",
  //     select: "firstName lastName avatar",
  //   })
  //   .lean();

  const { channels: publicChannels, members } = await Organization.findById(
    orgId
  )
    .populate({
      path: "channels",
      select: "name isPrivate avatar",
      match: { isPrivate: false },
    })
    .populate({
      path: "members",
      select: "firstName lastName avatar",
    })
    .lean();

  //remove channels user is already in
  const channelsToJoin = publicChannels.filter(
    (channel) => !userChannels.includes(channel._id)
  );

  // remove current user from organization's member list
  members.splice(
    members.findIndex((member) => member._id.valueOf() === userId.valueOf()),
    1
  );

  members.forEach((member) => {
    member.name = generateFullName(member);
    delete member.firstName;
    delete member.lastName;
  });

  return { publicChannels: channelsToJoin, members };
}

async function countUnreadNotification(userId, channelId) {
  const channelActivity = await ChannelActivity.findOne({
    userId: userId,
    channelId: channelId,
  }).exec();

  // set a default value if user never visited that channel
  const lastVisit = channelActivity
    ? channelActivity.lastVisit
    : "2000-01-01T00:00:00.457Z";

  const unreadMsgCount = await Message.countDocuments({
    receiver: channelId,
    time: { $gt: lastVisit },
  }).exec();

  return unreadMsgCount;
}

async function getChannelById(id) {
  const channel = await Channel.findById(id)
    .populate({
      path: "members",
      select: "firstName lastName avatar",
    })
    .exec();
  return channel;
}

async function addChannel(channelData) {
  const { userId, name, isDM, isPrivate, avatar, description, organization } =
    channelData;
  const user = await User.findById(userId).exec();
  if (!user || !user.organization.includes(organization)) {
    return { state: 1 };
  }
  const existingChannel = await Channel.findOne({ name, organization }).exec();
  if (existingChannel) {
    return { state: 2 };
  }
  const channel = new Channel({
    name,
    isDM,
    isPrivate,
    members: [userId],
    avatar,
    description,
    organization,
  });
  await channel.save();

  user.channels.addToSet(channel._id);
  await user.save();

  await Organization.findByIdAndUpdate(
    channel.organization,
    { $addToSet: { channels: channel._id } },
    { new: true }
  ).exec();

  return { channel, state: 0 };
}

// async function deleteChannelById(id) {
//   const channel = await Channel.findByIdAndDelete(id).exec();

//   await Organization.findByIdAndUpdate(
//     channel.organization,
//     { $pull: { channels: channel._id } },
//     { new: true }
//   ).exec();

//   for (const id of channel.members) {
//     await User.findByIdAndUpdate(
//       id,
//       { $pull: { channels: channel._id } },
//       { new: true }
//     ).exec();
//   }

//   return channel;
// }

// add one member at a time
async function addChannelMember(id) {
  const { channelId, userId, currentUserId } = id;
  const channel = await getChannelById(channelId);
  const user = await User.findById(userId).exec();
  if (!channel || !user) {
    return { state: 1 };
  }
  if (!user.organization || !user.organization.includes(channel.organization)) {
    return { state: 2 };
  }
  if (channel.isPrivate && !channel.members.includes(currentUserId)) {
    return { state: 3 };
  }
  channel.members.addToSet(userId);
  user.channels.addToSet(channelId);
  await channel.save();
  await user.save();
  return { channel, state: 0 };
}

// add multiple members at batch
async function batchAddChannelMembers(id) {
  const { channelId, userIdArray, currentUserId } = id;
  const channel = await Channel.findById(channelId).exec();
  let organizationFailCount = 0;

  if (!channel) {
    return { state: 1 };
  }
  if (channel.isPrivate && !channel.members.includes(currentUserId)) {
    return { state: 3 };
  }

  for (const userId of userIdArray) {
    const user = await User.findById(userId).exec();
    if (!user.organization || !user.organization.includes(channel.organization))
      organizationFailCount++;
  }
  if (organizationFailCount > 0) return { state: 2 };

  for (const userId of userIdArray) {
    const user = await User.findById(userId).exec();
    channel.members.addToSet(userId);
    user.channels.addToSet(channelId);
    await channel.save();
    await user.save();
  }
  membersJoinSocketChannel([...userIdArray, currentUserId], channel._id);

  await sendNewChannelNotification({ type: "channel", channelId: channel._id });

  return { channel, state: 0 };
}

async function removeChannelMember(id) {
  const { channelId, userId, currentUserId } = id;
  const channel = await getChannelById(channelId);
  const user = await User.findById(userId).exec();
  if (!channel || !user) {
    return { state: 1 };
  }
  if (!channel.members.includes(currentUserId)) {
    return { state: 2 };
  }
  channel.members.pull(userId);
  user.channels.pull(channelId);
  await channel.save();
  await user.save();
  return { channel, state: 0 };
}

async function updateChannelById(channelData) {
  const { channelId, avatar, description, lastMessage } = channelData;
  const channel = await Channel.findByIdAndUpdate(
    channelId,
    { avatar, description, lastMessage },
    { new: true }
  ).exec();
  return channel;
}

async function verifyGroupMembersBeforeAdding(memberIdArray, orgId) {
  let isVerified = true;
  for (const userId of memberIdArray) {
    const { organization } = await User.findById(userId).exec();
    if (!organization.find((id) => id.toString() === orgId.toString())) {
      isVerified = false;
      break;
    }
  }
  return isVerified;
}

async function createGroupAddMemberSendMsgPackage({
  userId,
  name,
  isDM,
  isPrivate,
  avatar,
  description,
  organization,
  memberIdArray,
}) {
  const isVerified = await verifyGroupMembersBeforeAdding(
    memberIdArray,
    organization
  );
  if (!isVerified) return { code: 400, content: "including invalid members" };

  const { channel, state } = await addChannel({
    userId,
    name,
    isDM,
    isPrivate,
    avatar,
    description,
    organization,
  });
  if (state === 1) return { code: 404, content: "user not in organization" };
  if (state === 2) return { code: 409, content: "Group already existed" };

  for (const memberId of memberIdArray) {
    const user = await User.findById(memberId).exec();
    channel.members.addToSet(memberId);
    user.channels.addToSet(channel._id);
    await channel.save();
    await user.save();
  }

  membersJoinSocketChannel([...memberIdArray, userId], channel._id);

  await sendWelcomeMsgToChannel({
    userId,
    channelId: channel._id,
    channelName: name,
  });

  await sendNewChannelNotification({ type: "channel", channelId: channel._id });
  return { code: 200, content: channel };
}

async function createDmAddUserSendMsgPackage({
  userId,
  name,
  isDM,
  isPrivate,
  organization,
  memberId,
}) {
  const member = await User.findById(memberId).exec();
  if (!member) return { code: 400, content: "invalid member" };

  const { channel, state } = await addChannel({
    name,
    userId,
    isDM,
    isPrivate,
    organization,
  });
  if (state === 1) return { code: 404, content: "user not in organization" };
  if (state === 2) return { code: 409, content: "Group already existed" };

  channel.members.addToSet(memberId);
  member.channels.addToSet(channel._id);
  await channel.save();
  await member.save();

  membersJoinSocketChannel([memberId, userId], channel._id);

  // await sendWelcomeMsgToChannel({
  //   userId,
  //   channelId: channel._id,
  //   channelName: name,
  // });

  await addMsg({
    sender: userId,
    receiver: channel._id,
    content: `Hi ${member.firstName}`,
    msgType: "text",
    time: new Date(),
  });

  await sendNewChannelNotification({ type: "dm", channelId: channel._id });
  return { code: 200, content: channel };
}

async function verifyGroupName({ groupName, organizationId }) {
  const organization = await Organization.findById(organizationId)
    .populate({
      path: "channels",
      select: "name",
    })
    .exec();
  return !organization.channels.find((channel) => channel.name === groupName);
}

async function AddMemberSendMsgPackage({ channelId, userId }) {
  const user = await User.findById(userId).exec();
  const channel = await Channel.findById(channelId).exec();

  if (!user || !channel) {
    return; // user or channel not found
  }

  channel.members.addToSet(userId);
  user.channels.addToSet(channelId);
  await channel.save();
  await user.save();

  membersJoinSocketChannel([userId], channelId);

  const welcomeMsg = new Message({
    sender: userId,
    receiver: channelId,
    content: "hello everyone",
    msgType: "text",
    time: new Date(),
  });
  await welcomeMsg.save();
  const msg = await Message.findById(welcomeMsg._id)
    .populate([
      { path: "sender", select: "firstName lastName avatar" },
      { path: "receiver", select: "name avatar" },
    ])
    .exec();

  await io.to(channelId.toString()).emit("receiveMsg", { data: { msg } });

  await sendNewChannelNotification({ type: "channel", channelId: channel._id });
  return channel;
}

module.exports = {
  getChannelSummary,
  getDmSummary,
  getOtherChannels,
  getChannelById,
  addChannel,
  // deleteChannelById,
  addChannelMember,
  batchAddChannelMembers,
  removeChannelMember,
  updateChannelById,
  verifyGroupMembersBeforeAdding,
  createGroupAddMemberSendMsgPackage,
  createDmAddUserSendMsgPackage,
  verifyGroupName,
  AddMemberSendMsgPackage,
};
