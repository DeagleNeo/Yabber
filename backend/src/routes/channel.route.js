const { Router } = require("express");
const {
  channelSummary,
  dmSummary,
  browseOtherChannels,
  // deleteChannel,
  removeUserFromChannel,
  updateChannelInfo,
  getChannelInfo,
  createChannelAndAddMembers,
  isGroupNameAvailable,
  createDmAndAddUser,
  addUsersToChannel,
  addUserToChannel,
} = require("../controllers/channel.controller");
const {
  updateChannelVisitTime,
} = require("../controllers/channelActivity.controller");
// const auth = require("../middleware/auth");

const channelRouter = Router();

channelRouter.get("/channels/summary", channelSummary);
channelRouter.get("/dms/summary", dmSummary);
channelRouter.get("/discover", browseOtherChannels);
// channelRouter.delete("/:channelId", deleteChannel);
// channelRouter.put("/:channelId/member/:userId", addUserToChannel);
channelRouter.delete("/:channelId/member/:userId", removeUserFromChannel);
channelRouter.put("/info/:channelId", updateChannelInfo);
channelRouter.get("/info/:channelId", getChannelInfo);
channelRouter.put("/updatevisittime", updateChannelVisitTime);
channelRouter.put("/addmembers", addUsersToChannel );
channelRouter.post("/verifygroupname",isGroupNameAvailable)

channelRouter.post("/create", createChannelAndAddMembers);
channelRouter.post("/create/dm", createDmAndAddUser);

channelRouter.post("/addUser", addUserToChannel);

channelRouter.post("/addUser", addUserToChannel);

module.exports = channelRouter;

