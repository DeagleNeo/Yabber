const User = require("../models/user");

const {
  getChannelSummary,
  getDmSummary,
  getOtherChannels,
  addChannel,
  // deleteChannelById,
  addChannelMember,
  batchAddChannelMembers,
  removeChannelMember,
  updateChannelById,
  getChannelById,
  verifyGroupMembersBeforeAdding,
  createGroupAddMemberSendMsgPackage,
  createDmAddUserSendMsgPackage,
  verifyGroupName,
  AddMemberSendMsgPackage,
} = require("../services/channel.service");

async function channelSummary(req, res) {
  const { id: userId } = req.user;
  const { orgId } = req.org;
  const data = await getChannelSummary({ userId, orgId });
  return res.status(200).json({ data: data });
}

async function dmSummary(req, res) {
  const { id: userId } = req.user;
  const { orgId } = req.org;
  const data = await getDmSummary({ userId, orgId });
  return res.status(200).json({ data: data });
}

async function browseOtherChannels(req, res) {
  const { id: userId } = req.user;
  const { orgId } = req.org;
  const data = await getOtherChannels({ userId, orgId });
  return res.status(200).json({ data: data });
}

async function createChannel(req, res) {
  const { id: userId } = req.user;
  const { name, isDM, isPrivate, avatar, description, organization } = req.body;
  const { channel, state } = await addChannel({
    userId,
    name,
    isDM,
    isPrivate,
    avatar,
    description,
    organization,
  });
  if (state === 1) {
    return res.status(404).json({ error: "user not in organization" });
  } else if (state === 2) {
    return res
      .status(409)
      .json({ error: "Group already existed, please use another group name." });
  }
  return res.json({ data: { channel } });
}

// async function deleteChannel(req, res) {
//   const { channelId } = req.params;
//   const channel = await deleteChannelById(channelId);
//   if (!channel) {
//     return res.status(404).json({ error: "channel not found" });
//   }
//   return res.sendStatus(204);
// }

// we now add an array of users, this controller is commented out
// async function addUserToChannel(req, res) {
//   const { id: currentUserId } = req.user;
//   const { channelId, userId } = req.params;
//   const { channel, state } = await addChannelMember({
//     channelId,
//     userId,
//     currentUserId,
//   });
//   if (state === 1) {
//     return res.status(404).json({ error: "channel or user not found" });
//   } else if (state === 2) {
//     return res
//       .status(404)
//       .json({ error: "user not in organization, please add user first" });
//   } else if (state === 3) {
//     return res
//       .status(404)
//       .json({ error: "private channel require member invitation to enter" });
//   }
//   return res.json({ data: { channel } });
// }

// the addUserToChannel function adds one member at a time. It is replaced by this new one
// adding an array of users at a time
async function addUsersToChannel(req, res) {
  const { id: currentUserId } = req.user;
  const { channelId, userIdArray } = req.body;

  const { channel, state } = await batchAddChannelMembers({
    channelId,
    userIdArray,
    currentUserId,
  });
  if (state === 1) {
    return res.status(404).json({ error: "channel or user not found" });
  } else if (state === 2) {
    return res
      .status(404)
      .json({ error: "user not in organization, please add user first" });
  } else if (state === 3) {
    return res
      .status(404)
      .json({ error: "private channel require member invitation to enter" });
  }
  return res.json({ data: { channel } });
}

async function removeUserFromChannel(req, res) {
  const { id: currentUserId } = req.user;
  const { channelId, userId } = req.params;
  const { channel, state } = await removeChannelMember({
    channelId,
    userId,
    currentUserId,
  });
  if (state === 1) {
    return res.status(404).json({ error: "channel or user not found" });
  } else if (state === 2) {
    return res
      .status(404)
      .json({ error: "only channel member can remove other members" });
  }
  res.json({ data: { channel } });
}

async function updateChannelInfo(req, res) {
  const { channelId } = req.params;
  const { avatar, description, lastMessage } = req.body;
  const channel = await updateChannelById({
    channelId,
    avatar,
    description,
    lastMessage,
  });
  if (!channel) {
    return res.status(404).json({ error: "channel not found, update failed" });
  }
  return res.json({ data: { channel } });
}

async function getChannelInfo(req, res) {
  const { channelId } = req.params;
  const channel = await getChannelById(channelId);
  if (!channel) {
    return res.status(404).json({ error: "channel not found" });
  }
  return res.json({ data: { channel } });
}

// async function createChannelAndAddMembers(req, res) {
//   const { id: userId } = req.user;
//   const {
//     name,
//     isDM,
//     isPrivate,
//     avatar,
//     description,
//     organization,
//     memberIdArray,
//   } = req.body;

//   //verify all user ids
//   const isVerified = await verifyGroupMembersBeforeAdding(
//     memberIdArray,
//     organization
//   );
//   if (!isVerified) {
//     return res
//       .status(400)
//       .json({ data: { error: "including invalid members" } });
//   }

//   //create channel
//   const { channel, state } = await addChannel({
//     userId,
//     name,
//     isDM,
//     isPrivate,
//     avatar,
//     description,
//     organization,
//   });
//   if (state === 1) {
//     return res.status(404).json({ error: "user not in organization" });
//   } else if (state === 2) {
//     return res
//       .status(409)
//       .json({ error: "Group already existed" });
//   }

//   // add members to channels, add channelId in all user channel array
//   for (const memberId of memberIdArray) {
//     const user = await User.findById(memberId).exec();
//     channel.members.addToSet(memberId);
//     user.channels.addToSet(channel._id);
//     await channel.save();
//     await user.save();
//   }

//   // the memberlist does not include the initiating user, need to add it
//   membersJoinSocketChannel([...memberIdArray, userId], channel._id);

//   const msg = await addMsg({
//     sender: userId,
//     receiver: channel._id,
//     content: `hello everyone, welcome to ${name}`,
//     msgType: "text",
//     time: new Date(),
//   });
//   await io.to(channel._id.toString()).emit("receiveMsg", { data: { msg } });

//   res.status(200).json({ data: channel });
// }

async function createChannelAndAddMembers(req, res) {
  const { id: userId } = req.user;
  const {
    name,
    isDM,
    isPrivate,
    avatar,
    description,
    organization,
    memberIdArray,
  } = req.body;

  const response = await createGroupAddMemberSendMsgPackage({
    userId,
    name,
    isDM,
    isPrivate,
    avatar,
    description,
    organization,
    memberIdArray,
  });

  res.status(response.code).json({ data: response.content });
}

async function createDmAndAddUser(req, res) {
  const { id: userId } = req.user;
  const { name, isDM, isPrivate, organization, memberId } = req.body;
  const response = await createDmAddUserSendMsgPackage({
    userId,
    name,
    isDM,
    isPrivate,
    organization,
    memberId,
  });

  res.status(response.code).json({ data: response.content });
}

async function isGroupNameAvailable(req, res) {
  const { groupName, organizationId } = req.body;
  const available = await verifyGroupName({ groupName, organizationId });
  if (!available) return res.sendStatus(409);
  if (available) return res.sendStatus(200);
}

async function addUserToChannel(req, res) {
  const { id: userId } = req.user;
  const { channelId } = req.body;

  const channel = await AddMemberSendMsgPackage({ channelId, userId });
  if (!channel) {
    return res.status(404).json({ error: "channel or user not found" });
  }
  return res.json({ data: { channel } });
}

module.exports = {
  channelSummary,
  dmSummary,
  browseOtherChannels,
  createChannel,
  // deleteChannel,
  addUsersToChannel,
  removeUserFromChannel,
  updateChannelInfo,
  getChannelInfo,
  createChannelAndAddMembers,
  isGroupNameAvailable,
  createDmAndAddUser,
  addUserToChannel,
};
