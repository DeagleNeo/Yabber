const ChannelActivity = require("../models/channelActivity");
const User = require("../models/user");
const Channel = require("../models/channel");
const { default: mongoose } = require("mongoose");

async function updateChannelActivity(userId, channelId, time) {
  const user = await User.findById(userId).exec();
  const channel = await Channel.findById(channelId).exec();

  if (!user) return null;
  if (!channel) return null;

  const condition = { userId: userId, channelId: channelId };
  const update = { lastVisit: time };
  const updatedActivity = await ChannelActivity.findOneAndUpdate(
    condition,
    update,
    {
      new: true,
      upsert: true,
    }
  );
  return updatedActivity;
}

async function batchGetUnreadMsgNumbers(userId, channelObjectIdArray) {
  const unreadMessageNumberMap = new Map();
  const unreadMsgNumbers = await ChannelActivity.aggregate([
    {
      $match: {
        userId: mongoose.Types.ObjectId(userId),
        channelId: { $in: channelObjectIdArray },
      },
    },
    {
      $lookup: {
        from: "messages",
        let: { lastVisit: "$lastVisit", channelId: "$channelId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$receiver", "$$channelId"] },
                  { $gt: ["$time", "$$lastVisit"] },
                ],
              },
            },
          },
          { $count: "unreadMsgNumber" },
        ],
        as: "unreadMsg",
      },
    },
  ]);

  for (let { channelId, unreadMsg } of unreadMsgNumbers) {
    if (unreadMsg.length === 0) continue;
    channelId = channelId.toString();
    const [{ unreadMsgNumber }, ...rest] = unreadMsg;
    unreadMessageNumberMap.set(channelId, unreadMsgNumber);
  }
  return unreadMessageNumberMap;
}

module.exports = { updateChannelActivity, batchGetUnreadMsgNumbers };
