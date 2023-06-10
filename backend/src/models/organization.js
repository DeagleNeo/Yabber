const { Schema, model, Types } = require('mongoose');

const orgSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  admin: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
  members: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
  channels: [
    {
      type: Types.ObjectId,
      ref: 'Channel',
    },
  ],
  link: {
    type: String,
  },
  description: {
    type: String,
  },
  avatar: {
    type: String,
  },
  deactivated: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = model('Organization', orgSchema);
