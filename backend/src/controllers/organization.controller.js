const {
  addOrg,
  getOrgById,
  updateOrgById,
  // deleteOrgById,
  addOrgMember,
  removeOrgMember,
  addOrgAdmin,
  removeOrgAdmin,
  listOrganizationMembers,
  listOrganizationMembersExceptMe,
  moveUserFromMemberToDeactivated,
  moveUserFromDeactivatedToMember,
} = require("../services/organization.service");

async function createOrg(req, res) {
  const { id: userId } = req.user;
  const { name, description, avatar } = req.body;
  const org = await addOrg({ userId, name, description, avatar });
  return res.status(201).json({ data: { org } });
}

async function getOrgInfo(req, res) {
  const { orgId } = req.params;
  const org = await getOrgById(orgId);
  if (!org) {
    return res.status(404).json({ error: "organization not found" });
  }
  return res.json({ data: { org } });
}

async function updateOrgInfo(req, res) {
  const { orgId } = req.org;
  const { name, owner, description, avatar } = req.body;
  const { org, state } = await updateOrgById({
    orgId,
    name,
    owner,
    description,
    avatar,
  });
  if (state === 1) {
    return res
      .status(403)
      .json({ error: "user not in organization, please add user first" });
  } else if (state === 2) {
    return res
      .status(404)
      .json({ error: "organization not found, update failed" });
  }
  return res.json({ data: { org } });
}

// async function deleteOrg(req, res) {
//   const { orgId } = req.params;
//   const org = await deleteOrgById(orgId);
//   if (!org) {
//     return res.status(404).json({ error: "organization not found" });
//   }
//   return res.sendStatus(204);
// }

async function addUserToOrg(req, res) {
  const { id: currentUserId } = req.user;
  const { orgId } = req.org;
  const { userId } = req.params;
  const { org, state } = await addOrgMember({ orgId, userId, currentUserId });
  if (state === 1) {
    return res.status(403).json({
      error: "only organization member can add other users to organization",
    });
  } else if (state === 2) {
    return res.status(404).json({ error: "user or organization not found" });
  }
  return res.json({ data: { org } });
}

async function removeUserFromOrg(req, res) {
  const { orgId } = req.org;
  const { userId } = req.params;
  const { org, state } = await removeOrgMember({ orgId, userId });
  if (state === 1) {
    return res.status(404).json({ error: "user or organization not found" });
  } else if (state === 2) {
    return res.status(403).json({ error: "cannot remove the owner of organization" });
  }
  return res.json({ data: {org} });
}

async function setUserAsAdmin(req, res) {
  const { orgId } = req.org;
  const { userId } = req.params;
  const { org, state } = await addOrgAdmin({ orgId, userId });
  if (state === 1) {
    return res.status(404).json({ error: "user or organization not found" });
  } else if (state === 2) {
    return res
      .status(403)
      .json({ error: "user not in organization, please add user first" });
  }
  return res.json({ data: { org } });
}

async function unsetUserAsAdmin(req, res) {
  const { orgId } = req.org;
  const { userId } = req.params;
  const org = await removeOrgAdmin({ orgId, userId });
  if (!org) {
    return res.status(404).json({ error: "user or organization not found" });
  }
  return res.json({ data: { org } });
}

async function getOrganizationMembers(req, res) {
  // const memberList = await listOrganizationMembers(req.organization.id);
  const { orgId } = req.org;
  const memberList = await listOrganizationMembers(orgId);
  return res.status(200).json({ data: memberList });
}

async function getOtherMembersInOrganization(req, res) {
  // const memberList = await listOrganizationMembersExceptMe(
  //   req.organization.id,
  //   req.user.id
  // );
  const { id: userId } = req.user;
  const { orgId } = req.org;
  const memberList = await listOrganizationMembersExceptMe(orgId, userId);
  return res.status(200).json({ data: memberList });
}

async function setUserToDeactivated(req, res) {
  const { orgId } = req.org;
  const { userId } = req.params;
  const { org, state } = await moveUserFromMemberToDeactivated({ orgId, userId });
  if (state === 1) {
    return res.status(404).json({ error: "user or organization not found" });
  } else if (state === 2) {
    return res.status(403).json({ error: "the owner cannot be moved" });
  } else if (state === 3) {
    return res.status(403).json({ error: "user not in this organization" });
  }
  return res.json({ data: {org} });
}

async function setUserToActive(req, res) {
  const { orgId } = req.org;
  const { userId } = req.params;
  const { org, state } = await moveUserFromDeactivatedToMember({ orgId, userId });
  if (state === 1) {
    return res.status(404).json({ error: "user or organization not found" });
  } else if (state === 2) {
    return res.status(403).json({ error: "the owner cannot be moved" });
  } else if (state === 3) {
    return res.status(403).json({ error: "user not in this organization" });
  }
  return res.json({ data: {org} });
}

module.exports = {
  createOrg,
  getOrgInfo,
  updateOrgInfo,
  // deleteOrg,
  addUserToOrg,
  removeUserFromOrg,
  setUserAsAdmin,
  unsetUserAsAdmin,
  getOrganizationMembers,
  getOtherMembersInOrganization,
  setUserToDeactivated,
  setUserToActive,
};
