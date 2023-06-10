const {
  updateChannelActivity,
} = require("../services/channelActivity.service");

async function updateChannelVisitTime(req, res) {
  const { id } = req.user;
  const { channelId, time } = req.body;
  const update = await updateChannelActivity(id, channelId, time);
  if (!update) res.sendStatus(404);
  res.sendStatus(204);
}

module.exports = { updateChannelVisitTime };
