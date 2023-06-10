const { generateToken } = require("../jwt/jwt");
const {
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
} = require("../services/user.service");

async function connectionSummary(req, res) {
  const { id: userId } = req.user;
  const { orgId } = req.org;
  const data = await userConnectionSummary({ userId, orgId });
  return res.status(200).json({ data: data });
}

async function register(req, res) {
  const { accountName, password, firstName, lastName, timezone } = req.body;
  if (!accountName || !password || !firstName) {
    return res
      .status(404)
      .json({ error: "account name, password and first name are required" });
  }
  const user = await createUser({
    accountName,
    password,
    firstName,
    lastName,
    timezone,
  });
  if (!user) {
    return res
      .status(404)
      .json({ error: "account name has existed, please change" });
  }
  const token = generateToken({ id: user._id });
  return res.status(201).json({ data: { user, token } });
}

async function login(req, res) {
  const { accountName, password } = req.body;
  if (!accountName || !password) {
    return res
      .status(404)
      .json({ error: "account name and password are required" });
  }
  const user = await getUserByAccountName({ accountName, password });
  if (!user) {
    return res.status(401).json({ error: "invalid email or password" });
  }
  const token = generateToken({ id: user._id });

  return res.status(200).json({ data: { user, token } });
}

async function getUserInfo(req, res) {
  const { userId } = req.params;
  const user = await getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  return res.json({ data: { user } });
}

async function updateUserInfo(req, res) {
  const { id } = req.user;
  const {
    email,
    firstName,
    lastName,
    avatar,
    department,
    jobTitle,
    activeChannel,
    timezone,
    city,
    country,
  } = req.body;
  const user = await updateUserById(id, {
    email,
    firstName,
    lastName,
    avatar,
    department,
    jobTitle,
    activeChannel,
    timezone,
    city,
    country,
  });
  if (!user) {
    return res.status(404).json({ error: "user not found, update failed" });
  }
  return res.json({ data: { user } });
}

async function changePassword(req, res) {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res
      .status(404)
      .json({ error: "old password or new password is required" });
  }
  const user = await updateUserPassword(id, oldPassword, newPassword);
  if (!user) {
    return res.status(404).json({ error: "invalid password" });
  }
  return res.json({ data: { user } });
}

async function searchUsers(req, res) {
  const {
    accountName,
    email,
    firstName,
    lastName,
    department,
    jobTitle,
    city,
    country,
  } = req.query;
  const users = await getUsersByKeywords({
    accountName,
    email,
    firstName,
    lastName,
    department,
    jobTitle,
    city,
    country,
  });
  if (!users) {
    return res.status(404).json({ error: "users not found" });
  }
  return res.json({ data: { users } });
}

// async function deleteUser(req, res) {
//   const { id } = req.user;
//   const user = await deleteUserById(id);
//   if (!user) {
//     return res.status(404).json({ error: "user not found" });
//   }
//   return res.sendStatus(204);
// }

async function isEmailAvailable(req, res) {
  const { email } = req.body;
  if (!email) return res.sendStatus(400);
  const isAvailable = await checkEmailAvailability(email);
  if (isAvailable) return res.sendStatus(200);
  if (!isAvailable) return res.sendStatus(409);
}

function verifyToken(req, res) {
  return res.sendStatus(200);
}

async function getCurrentUserOrganization(req, res) {
  const { id } = req.user;
  const organizations = await listOrganization(id);
  return res.json({ data: organizations });
}

async function checkInvitations(req, res) {
  const { id } = req.user;
  const { firstName, lastName, invitations } = await listUserInvitations(id);
  return res.status(200).json({ data: { firstName, lastName, invitations } });
}

async function acceptInvitation(req, res) {
  const { id: userId } = req.user;
  const { orgId } = req.body;
  const confirmation = await userJoinOrganization(userId, orgId);
  if (!confirmation)
    return res
      .status(403)
      .json({ data: { error: "invalid organization number" } });
  return res.status(200).json({ data: orgId });
}

async function declineInvitation(req, res) {
  const { id: userId } = req.user;
  const { orgId } = req.body;
  const updatedInvitations = await removeInvitation(userId, orgId);
  if (!updatedInvitations) return res.sendStatus(400);
  return res.json({ data: updatedInvitations });
}

async function InviteUser(req, res) {
  const { orgId } = req.user;
  const { accountName } = req.body;
  const { user, state } = await addUserInvitation(accountName, orgId);
  if (state === 1) {
    return res.status(404).json({ error: "invitee not found" });
  } else if (state === 2) {
    return res
      .status(409)
      .json({ error: "invitee already in this organization" });
  }
  return res.json({ data: { user } });
}

module.exports = {
  connectionSummary,
  register,
  login,
  getUserInfo,
  updateUserInfo,
  changePassword,
  searchUsers,
  // deleteUser,
  isEmailAvailable,
  verifyToken,
  getCurrentUserOrganization,
  checkInvitations,
  InviteUser,
  acceptInvitation,
  declineInvitation,
};
