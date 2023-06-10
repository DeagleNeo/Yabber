const { Schema, model, Types } = require("mongoose");

const msgSchema = new Schema({
  sender: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Types.ObjectId,
    ref: "Channel",
    required: true,
    index: 1,
  },
  content: {
    type: String,
  },
  msgType: {
    type: String,
    enum: ["text", "image", "file"],
  },
  time: {
    type: Date,
    default: Date.now,
  },
  reaction: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  imageUrl: {
    type: String,
  },
});

module.exports = model("Message", msgSchema);
