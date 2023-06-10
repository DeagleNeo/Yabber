const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },

  channelId: {
    type: Types.ObjectId,
    ref: "Channel",
    required: true,
  },

  lastVisit: {
    type: Date,
  },
});
schema.index({ userId: 1, channelId: -1 });
module.exports = model("ChannelActivity", schema);
