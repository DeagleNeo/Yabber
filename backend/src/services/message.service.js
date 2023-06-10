const Message = require("../models/message");
const Channel = require("../models/channel");

async function addMsg(msgData) {
  const { sender, receiver, content, msgType, time, imageUrl } = msgData;
  const msg = new Message({
    sender,
    receiver,
    content,
    msgType,
    time,
    imageUrl,
  });
  await msg.save();

  const sentMsg = await Message.findById(msg._id)
    .populate([
      { path: "sender", select: "firstName lastName avatar" },
      { path: "receiver", select: "name avatar" },
    ])
    .lean();

  return sentMsg;
}

async function getMsgsByChannel(userId, channelId, fmid, number) {
  const channel = await Channel.findById(channelId).exec();
  if (!channel || isMsgPrivate(userId, channel)) {
    return;
  }

  const filter = !!fmid
    ? { receiver: channelId, _id: { $lt: fmid } }
    : { receiver: channelId };

  const msgs = await Message.find(filter)
    .populate([
      { path: "sender", select: "firstName lastName avatar" },
      { path: "receiver", select: "name avatar" },
    ])
    .sort({ time: -1 })
    .limit(number)
    .lean();
  const ascendingMsgs = msgs.reverse();
  return ascendingMsgs;
}
// async function getMsgsByChannel(id) {
//   const { userId, channelId } = id;
//   const channel = await Channel.findById(channelId).exec();
//   if (!channel || isMsgPrivate(userId, channel)) {
//     return;
//   }
//   const msgs = await Message.find({ receiver: channelId })
//     .populate([
//       { path: "sender", select: "firstName lastName avatar" },
//       { path: "receiver", select: "name avatar" },
//     ])
//     .sort({ time: 1 })
//     .exec();
//   return msgs;
// }

async function getMsgsByKeywords(keywords) {
  const { sender, receiver, content, begin_time, end_time } = keywords;
  const msgs = await Message.find({
    sender,
    receiver,
    content: { $regex: content },
    time: { $gte: new Date(begin_time), $lte: new Date(end_time) },
  })
    .sort({ time: -1 })
    .exec();
  if (msgs.length === 0) {
    return;
  }
  return msgs;
}

async function updateMsgReaction(msgId, userId) {
  const msg = await Message.findById(msgId).exec();
  if (!msg) {
    return;
  }
  if (msg.reaction.includes(userId)) {
    msg.reaction.pull(userId);
  } else {
    msg.reaction.push(userId);
  }
  await msg.save();
  return msg;
}

async function deleteMsgById(id) {
  const msg = await Message.findByIdAndDelete(id).exec();
  return msg;
}

const isMsgPrivate = (userId, channel) => {
  const { members, isPrivate } = channel;
  if (isPrivate && !members.includes(userId)) {
    return true;
  }
  return false;
};

async function getLastMessage(channelId) {
  const messages = await Message.find({ receiver: channelId })
    .sort({ time: -1 })
    .limit(1)
    .exec();
  //find() will return an empty array if no match is found
  if (messages.length === 0) return { note: "no message in this channel" };
  // the above line is to prevent returning an empty object, which will cause errow when compairng lastMessage.time
  const { msgType, content, time } = messages[0];

  return { msgType, content, time };
}

async function batchGetLastMessage(channelIdArray) {
  const lastMessageMap = new Map();
  const lastMessagesArray = await Message.aggregate([
    { $match: { receiver: { $in: channelIdArray } } },
    { $sort: { time: -1 } },
    {
      $group: {
        _id: "$receiver",
        lastMsgId: { $first: "$_id" },
        msgType: { $first: "$msgType" },
        content: { $first: "$content" },
        time: { $first: "$time" },
      },
    },
  ]);

  for (let { _id: channelId, msgType, content, time } of lastMessagesArray) {
    channelId = channelId.toString();
    lastMessageMap.set(channelId, { msgType, content, time });
  }
  return lastMessageMap;
}

async function getMessageReactionNames(msgId) {
  const msg = await Message.findById(msgId)
    .populate({
      path: "reaction",
      select: "firstName lastName name avatar",
    })
    .exec();

  return msg.reaction;
}

module.exports = {
  addMsg,
  getMsgsByChannel,
  getMsgsByKeywords,
  updateMsgReaction,
  deleteMsgById,
  getLastMessage,
  batchGetLastMessage,
  getMessageReactionNames,
};
