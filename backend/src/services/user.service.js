const User = require("../models/user");
const Organization = require("../models/organization");
const Channel = require("../models/channel");
const {
  getChannelSummary,
  getDmSummary,
  addChannelMember,
} = require("./channel.service");
const { getUserRole } = require("./organization.service");
const generateFullName = require("../utils/generateFullName");

async function userConnectionSummary({ userId, orgId }) {
  const user = await User.findById(userId)
    .select("firstName lastName avatar")
    .lean();
  const org = await Organization.findById(orgId).select("name avatar").exec();
  // const channels = await getChannelSummary({ userId, orgId });
  // const dms = await getDmSummary({ userId, orgId });
  // const totalDmNotification = dms.reduce((sum, dm) => sum + dm.notification, 0);

  user.name = generateFullName(user);
  user.role = await getUserRole({ userId, orgId });

  // return { ...user, organization: [org], channels, totalDmNotification };
  return { ...user, organization: [org] };
}

async function createUser(userData) {
  const { accountName, password, firstName, lastName, timezone } = userData;
  const existingUser = await User.findOne({ accountName }).exec();
  if (existingUser) {
    return;
  }
  const user = new User({
    accountName,
    password,
    email: accountName,
    firstName,
    lastName,
    timezone,
  });
  await user.hashPassword();
  await user.save();
  user.password = undefined;
  return user;
}

async function getUserByAccountName(userData) {
  const { accountName, password } = userData;
  const user = await User.findOne({ accountName }).exec();
  if (!user) {
    return;
  }
  const isPasswordValid = await user.validatePassword(password);
  if (!isPasswordValid) {
    return;
  }
  user.password = undefined;
  return user;
}

async function getUserById(id) {
  const user = await User.findById(id).select({ password: 0 }).exec();
  return user;
}

async function updateUserById(id, userData) {
  const {
    email,
    firstName,
    lastName,
    alias,
    avatar,
    department,
    jobTitle,
    activeChannel,
    timezone,
    city,
    country,
  } = userData;
  const user = await User.findByIdAndUpdate(
    id,
    {
      email,
      firstName,
      lastName,
      alias,
      avatar,
      department,
      jobTitle,
      activeChannel,
      timezone,
      city,
      country,
    },
    { new: true }
  )
    .select({ password: 0 })
    .exec();
  return user;
}

async function updateUserPassword(id, oldPassword, newPassword) {
  const user = await User.findById(id).exec();
  if (user) {
    const isPasswordValid = await user.validatePassword(oldPassword);
    if (!isPasswordValid) {
      return;
    }
    user.password = newPassword;
    await user.hashPassword();
    await user.save();
    user.password = undefined;
  }
  return user;
}

async function getUsersByKeywords(keywords) {
  const {
    accountName,
    email,
    firstName,
    lastName,
    department,
    jobTitle,
    city,
    country,
  } = keywords;
  const users = await User.find({
    accountName,
    email,
    firstName,
    lastName,
    department,
    jobTitle,
    city,
    country,
  })
    .select({ password: 0 })
    .exec();
  if (users.length === 0) {
    return;
  }
  return users;
}

// async function deleteUserById(id) {
//   const user = await User.findByIdAndDelete(id).exec();
//   return user;
// }

async function checkEmailAvailability(email) {
  const found = await User.findOne({ accountName: email }).exec();
  if (found) return false;
  return true;
}

async function listOrganization(userId) {
  const user = await User.findById(userId)
    .populate({
      path: "organization",
      select: "name avatar deactivated",
    })
    .exec();
  if (!user) return [];

  const orgList = [];
  for (const org of user.organization) {
    if (!org.deactivated.includes(userId)) {
      orgList.push(org);
    }
  }
  return orgList;
}

async function listUserInvitations(userId) {
  const { firstName, lastName, invitations } = await User.findById(userId)
    .populate({
      path: "invitations",
      select: "name description avatar",
    })
    .exec();
  return { firstName, lastName, invitations };
}

async function userJoinOrganization(userId, orgId) {
  const user = await User.findById(userId).exec();
  const org = await Organization.findById(orgId).exec();

  if (!org) return null;
  if (!user.invitations.includes(orgId)) return null; // check if user is indeed invited

  org.members.addToSet(userId);
  user.organization.addToSet(orgId);
  await org.save();
  await user.save();
  const generalChannel = await Channel.findOne({
    name: "general",
    organization: orgId,
  }).exec();

  await addChannelMember({
    channelId: generalChannel._id,
    userId,
    currentUserId: userId,
  });
  // remove used invitation
  await removeInvitation(userId, orgId);
  return user;
}

async function removeInvitation(userId, orgId) {
  const user = await User.findById(userId).exec();

  if (!user) return null;
  if (!user.invitations) return null;
  const updatedInvitations = user.invitations.filter(
    (id) => id.toString() !== orgId.toString()
  );
  user.invitations = updatedInvitations;
  user.save();
  return updatedInvitations;
}

async function addUserInvitation(accountName, orgId) {
  const user = await User.findOne({ accountName })
    .select({ password: 0 })
    .exec();

  if (!user) {
    return { state: 1 };
  }

  if (user.organization.includes(orgId)) {
    return { state: 2 };
  }

  user.invitations.addToSet(orgId);
  await user.save();
  return { user, state: 0 };
}

module.exports = {
  userConnectionSummary,
  createUser,
  getUserByAccountName,
  getUserById,
  updateUserPassword,
  updateUserById,
  getUsersByKeywords,
  // deleteUserById,
  checkEmailAvailability,
  listOrganization,
  listUserInvitations,
  addUserInvitation,
  userJoinOrganization,
  removeInvitation,
};
