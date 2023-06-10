const {
  addMsg,
  getMsgsByChannel,
  getMsgsByKeywords,
  updateMsgReaction,
  deleteMsgById,
  getMessageReactionNames,
} = require("../services/message.service");

async function createMsg(req, res) {
  const { sender, receiver, content, msgType, time } = req.body;
  const msg = await addMsg({ sender, receiver, content, msgType, time });
  return res.status(201).json({ data: { msg } });
}

async function initChannelMsgs(req, res) {
  const { id: userId } = req.user;
  const { channelId } = req.params;
  const { fmid, number } = req.query; //first message id
  const msgs = await getMsgsByChannel(userId, channelId, fmid, number);
  return res.json({ data: { msgs } });
}

// async function initChannelMsgs(req, res) {
//   const { id: userId } = req.user;
//   const { channelId } = req.params;
//   const {fmid}=req.query; //first message id
//   const msgs = await getMsgsByChannel({ userId, channelId,fmid });
//   return res.json({ data: { msgs } });
// }

async function searchMsgs(req, res) {
  const { sender, receiver, content, begin_time, end_time } = req.query;
  const msgs = await getMsgsByKeywords({
    sender,
    receiver,
    content,
    begin_time,
    end_time,
  });
  if (!msgs) {
    return res.status(404).json({ error: "Messages not found" });
  }
  return res.json({ data: { msgs } });
}

async function updateMsgInfo(req, res) {
  const { msgId } = req.params;
  const { userId } = req.body;
  const msg = await updateMsgReaction(msgId, userId);
  if (!msg) {
    return res.status(404).json({ error: "message not found, update failed" });
  }
  return res.json({ data: { msg } });
}

async function deleteMsg(req, res) {
  const { msgId } = req.params;
  const msg = await deleteMsgById(msgId);
  if (!msg) {
    return res.status(404).json({ error: "Message not found" });
  }
  return res.sendStatus(204);
}

async function getMessageReactionUsers(req, res) {
  const { msgId } = req.query;
  const names = await getMessageReactionNames(msgId);
  res.json({ data: names });
}

module.exports = {
  createMsg,
  initChannelMsgs,
  searchMsgs,
  updateMsgInfo,
  deleteMsg,
  getMessageReactionUsers,
};
