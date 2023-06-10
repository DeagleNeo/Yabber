const { Schema, model, Types } = require('mongoose');

const channelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isDM: {
    type: Boolean,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
  members: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
  avatar: {
    type: String,
  },
  description: {
    type: String,
  },
  lastMessage: {
    type: Types.ObjectId,
    ref: 'Message',
  },
  organization: {
    type: Types.ObjectId,
    ref: 'Organization',
  },

});

module.exports = model('Channel', channelSchema);
