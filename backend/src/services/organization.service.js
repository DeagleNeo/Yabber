require("dotenv").config();
const Organization = require("../models/organization");
const Channel = require("../models/channel");
const User = require("../models/user");
const { addChannel, addChannelMember } = require("./channel.service");
const generateFullName = require("../utils/generateFullName");

async function getOrgById(id) {
  const org = await Organization.findById(id).exec();
  return org;
}

async function addOrg(orgData) {
  const { userId, name, description, avatar } = orgData;
  const org = new Organization({
    name,
    owner: userId,
    admin: userId,
    members: [userId],
    channels: [],
    link: process.env.DOMAIN,
    description,
    avatar,
    deactivated: [],
  });
  org.link += org._id;
  await org.save();

  const user = await User.findById(userId).exec();
  user.organization.addToSet(org._id);
  await user.save();

  await addChannel({
    userId,
    name: "general",
    isDM: false,
    isPrivate: false,
    avatar: "url",
    description:
      "This is the one channel that will always include everyone. It is a great spot for announcements and team-wide conversations.",
    organization: org._id,
  });

  return await getOrgById(org._id);
}

async function updateOrgById(orgData) {
  const { orgId, name, owner, description, avatar } = orgData;
  const user = await User.findById(owner).exec();
  if (!user || !user.organization.includes(orgId)) {
    return { state: 1 };
  }
  const org = await Organization.findByIdAndUpdate(
    orgId,
    { name, owner, description, avatar },
    { new: true }
  ).exec();
  if (!org) {
    return { state: 2 };
  }
  return { org, state: 0 };
}

// async function deleteOrgById(id) {
//   const org = await Organization.findByIdAndDelete(id).exec();
//   return org;
// }

async function addOrgMember(id) {
  const { orgId, userId, currentUserId } = id;
  const currentUser = await User.findById(currentUserId).exec();
  if (!currentUser || !currentUser.organization.includes(orgId)) {
    return { state: 1 };
  }
  const org = await getOrgById(orgId);
  const user = await User.findById(userId).exec();
  if (!user || !org) {
    return { state: 2 };
  }
  org.members.addToSet(userId);
  org.deactivated.pull(userId);
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
    currentUserId,
  });
  return { org, state: 0 };
}

async function removeOrgMember(id) {
  const { orgId, userId } = id;
  const org = await getOrgById(orgId);
  const user = await User.findById(userId).exec();
  if (!user || !org) {
    return { state: 1 };
  }
  if (org.owner.toString() === userId) {
    return { state: 2 };
  }
  org.members.pull(userId);
  org.admin.pull(userId);
  org.deactivated.addToSet(userId);
  user.organization.pull(orgId);
  await org.save();
  await user.save();
  return { org, state: 0 };
}

async function addOrgAdmin(id) {
  const { orgId, userId } = id;
  const org = await getOrgById(orgId);
  const user = await User.findById(userId).exec();
  if (!user || !org) {
    return { state: 1 };
  }
  if (!user.organization.includes(orgId)) {
    return { state: 2 };
  }
  org.admin.addToSet(userId);
  await org.save();
  return { org, state: 0 };
}

async function removeOrgAdmin(id) {
  const { orgId, userId } = id;
  const org = await getOrgById(orgId);
  const user = await User.findById(userId).exec();
  if (!user || !org) {
    return;
  }
  org.admin.pull(userId);
  await org.save();
  return org;
}

//effective on one organization only
// async function getUserRole(userId) {
//   const {
//     organization: [{ _id: organizationId }, ...rest],
//   } = await User.findById(userId).exec();

//   const { owner, admin } = await Organization.findById(organizationId).lean();
//   const adminValueArray = admin.map((elem) => elem.toString());
//   if (owner.valueOf() === userId.valueOf()) return "owner";
//   if (adminValueArray.includes(userId.toString())) return "admin";
//   // need to test the adminValueArray method, as it is not sure about the types
//   return "member";
// }

async function getUserRole({ userId, orgId }) {
  const { owner, admin } = await Organization.findById(orgId).lean();
  const adminValueArray = admin.map((elem) => elem.toString());
  if (owner.valueOf() === userId.valueOf()) return "owner";
  if (adminValueArray.includes(userId.toString())) return "admin";
  // need to test the adminValueArray method, as it is not sure about the types
  return "member";
}

async function listOrganizationMembers(organizationId) {
  const organization = await Organization.findById(organizationId)
    .populate({
      path: "members",
      select: "firstName lastName email avatar",
    })
    .lean();
  if (!organization)
    return res.status(404).json({ data: { error: "organization not exist" } });
  const { members, admin, owner, deactivated } = organization;

  const getUserRoleWithoutQuery = (userId, owner, admin) => {
    if (owner.valueOf() === userId.valueOf()) return "owner";
    if (admin.includes(userId)) return "admin";
    return "member";
  };

  for (const member of members) {
    member.role = getUserRoleWithoutQuery(member._id, owner, admin);
    member.name = generateFullName(member);

    member.activeState = true; // true:active, false:deactivated
    for (const id of deactivated) {
      if (id.toString() === member._id.toString()) {
        member.activeState = false;
        break;
      }
    }
  }

  return members;
}

async function listOrganizationMembersExceptMe(organizationId, userId) {
  const members = await listOrganizationMembers(organizationId);
  members.splice(
    members.findIndex((member) => member._id.valueOf() === userId.valueOf()),
    1
  );
  return members;
}

async function moveUserFromMemberToDeactivated({ userId, orgId }) {
  const org = await getOrgById(orgId);
  const user = await User.findById(userId).exec();
  if (!user || !org) {
    return { state: 1 }; // user or organization not found
  }
  if (org.owner.toString() === userId) {
    return { state: 2 }; // owner can not be moved
  }
  if (!org.members.includes(userId) && !org.deactivated.includes(userId)) {
    return { state: 3 }; // user not in this organization
  }
  // org.members.pull(userId);
  org.deactivated.addToSet(userId);
  await org.save();
  return { org, state: 0 };
}

async function moveUserFromDeactivatedToMember({ userId, orgId }) {
  const org = await getOrgById(orgId);
  const user = await User.findById(userId).exec();
  if (!user || !org) {
    return { state: 1 }; // user or organization not found
  }
  if (org.owner.toString() === userId) {
    return { state: 2 }; // owner can not be moved
  }
  if (!org.members.includes(userId) && !org.deactivated.includes(userId)) {
    return { state: 3 }; // user not in this organization
  }
  org.deactivated.pull(userId);
  // org.members.addToSet(userId);
  await org.save();
  return { org, state: 0 };
}

module.exports = {
  addOrg,
  getOrgById,
  updateOrgById,
  // deleteOrgById,
  addOrgMember,
  removeOrgMember,
  addOrgAdmin,
  removeOrgAdmin,
  getUserRole,
  listOrganizationMembers,
  listOrganizationMembersExceptMe,
  moveUserFromMemberToDeactivated,
  moveUserFromDeactivatedToMember,
};
