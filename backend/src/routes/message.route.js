const { Router } = require("express");
const {
  createMsg,
  searchMsgs,
  initChannelMsgs,
  updateMsgInfo,
  deleteMsg,
  getMessageReactionUsers,
} = require("../controllers/message.controller");

const msgRouter = Router();

msgRouter.post("/", createMsg);
msgRouter.get("/search", searchMsgs);
msgRouter.get("/:channelId", initChannelMsgs);
msgRouter.put("/info/:msgId", updateMsgInfo);
msgRouter.delete("/:msgId", deleteMsg);
msgRouter.get("/info/reaction", getMessageReactionUsers);

module.exports = msgRouter;
