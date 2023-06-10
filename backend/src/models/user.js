const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    accountName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    avatar: {
      type: String,
    },
    department: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    // array of object id
    channels: [
      {
        type: Types.ObjectId,
        ref: "Channel",
      },
    ],
    organization: [
      {
        type: Types.ObjectId,
        ref: "Organization",
      },
    ],
    // to show which channel is now active
    activeChannel: {
      type: Types.ObjectId,
      ref: "Channel",
    },
    timezone: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    invitations: [
      {
        type: Types.ObjectId,
        ref: "Organization",
      },
    ],
    alias: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

userSchema.virtual("name").get(function () {
  return this.firstName + " " + this.lastName;
});

userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 12);
};

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//export
module.exports = model("User", userSchema);
