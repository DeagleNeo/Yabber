import axios from "axios";
const version = "v1";
axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_ADD}/${version}`;
const endpoint = {
  login: "/users/login",
  register: "/users/register",
  isemailavailable: "/users/isemailavailable",
  msgRouter: "/msgs",
  getUserInfo: "/users/info",
  getChannelInfo: "/channels/info",
  updateUserInfo: "/users/info",
  changePassword: "/users/password",
  authentication: "/users/authentication",
  userConnection: "/users/connectionsummary",
  userChannels: "/channels",
  inviteUser: "/users/invitation/add",
  userOrganization: "/users/organization",
  updateChannelVisitTime: "/channels/updatevisittime",
  otherMembers: "/orgs/othermembers",
  createChannel: "/channels",
  addMembers: "/channels/addmembers",
  invitations: "/users/invitations",
  acceptInvitation: "/users/invitation/accept",
  declineInvitation: "/users/invitation/decline",
  createChannelAndAddMembers: "/channels/create",
  createDmAndAddUser: "/channels/create/dm",
  createOrg: "/orgs/create",
  updateOrgMember: "orgs/member",
  updateOrgAdmin: "orgs/admin",
  setUserToDeactivated: "/orgs/deactivated",
  setUserToActive: "/orgs/active",
  getOrgInfo: "/orgs/info",
  orgMembers: "/orgs/members",
  addUser: "/channels/addUser",
  reactionUserNames: "/msgs/info/reaction",
};

axios.interceptors.request.use((request) => {
  const token =
    sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

  if (token) {
    request.headers["Authorization"] = token;
  }
  return request;
});

axios.interceptors.request.use((request) => {
  const currentOrg = sessionStorage.getItem("currentOrg");

  if (currentOrg) {
    request.headers["X-Current-Org"] = currentOrg;
  }
  return request;
});

const login = (email, password, keepLogin) => {
  return axios.post(endpoint.login, {
    accountName: email,
    password,
    keepLogin,
  });
};

const register = (email, password, firstName, lastName) => {
  return axios.post(endpoint.register, {
    accountName: email,
    password,
    firstName,
    lastName,
  });
};

const isEmailAvailable = (email) => {
  return axios.post(endpoint.isemailavailable, {
    email,
  });
};

const getUserInfo = (userId) => {
  return axios.get(`${endpoint.getUserInfo}/${userId}`);
};
const updateUserInfo = ({
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
}) => {
  return axios.put(endpoint.updateUserInfo, {
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
};

const changePassword = (oldPassword, newPassword) => {
  return axios.put(endpoint.changePassword, {
    oldPassword,
    newPassword,
  });
};

const getChannelInfo = (channelId) => {
  return axios.get(`${endpoint.getChannelInfo}/${channelId}`);
};

const initChannelMsgs = (channelId, messageNumber) => {
  return axios.get(
    `${endpoint.msgRouter}/${channelId}?number=${messageNumber}`
  );
};
// const initChannelMsgs = (channelId) => {
//   return axios.get(`${endpoint.msgRouter}/${channelId}`);
// };

const loadEarlierMessages = (channelId, fmid, number) => {
  return axios.get(
    `${endpoint.msgRouter}/${channelId}?fmid=${fmid}&number=${number}`
  );
};

const userConnection = () => {
  return axios.get(`${endpoint.userConnection}`);
};

const userChannels = (channelsType) => {
  return axios.get(`${endpoint.userChannels}/${channelsType}`);
};

const verifyToken = () => {
  return axios.get(endpoint.authentication);
};

const inviteUser = (email) => {
  return axios.put(endpoint.inviteUser, { accountName: email });
};

const getUserOrganizations = () => {
  return axios.get(endpoint.userOrganization);
};

const updateChannelVisitTime = (channelId, time) => {
  return axios.put(endpoint.updateChannelVisitTime, {
    channelId: channelId,
    time: time,
  });
};

const getOrganizationMembersExceptMe = () => {
  return axios.get(endpoint.otherMembers);
};

const createChannel = (name, description, isPrivate, organization) => {
  return axios.post(endpoint.createChannel, {
    name,
    description,
    isDM: false,
    isPrivate,
    organization,
  });
};

const getInvitations = () => {
  return axios.get(endpoint.invitations);
};

const addMemberstoChannel = ({ channelId, userIdArray }) => {
  return axios.put(endpoint.addMembers, { channelId, userIdArray });
};

const acceptInvitation = (orgId) => {
  return axios.put(endpoint.acceptInvitation, { orgId });
};

const declineInvitation = (orgId) => {
  return axios.put(endpoint.declineInvitation, { orgId });
};

const createOrg = ({ name, description, avatar }) => {
  return axios.post(endpoint.createOrg, {
    name,
    description,
    avatar,
  });
};

const createChannelAndAddMembers = ({
  name,
  description,
  isPrivate,
  organization,
  memberIdArray,
  avatar,
}) => {
  return axios.post(endpoint.createChannelAndAddMembers, {
    name,
    description,
    isDM: false,
    isPrivate,
    organization,
    memberIdArray,
    avatar,
  });
};

const createDmAndAddUser = ({ name, organization, memberId, avatar }) => {
  return axios.post(endpoint.createDmAndAddUser, {
    name,
    isDM: true,
    isPrivate: true,
    organization,
    memberId,
    avatar,
  });
};

// const addMemberToOrg = (userId) => {
//   return axios.put(`${endpoint.updateOrgMember}/${userId}`);
// };

// const removeUserFromOrg = (userId) => {
//   return axios.delete(`${endpoint.updateOrgMember}/${userId}`);
// };

const setUserAsAdmin = (userId) => {
  return axios.put(`${endpoint.updateOrgAdmin}/${userId}`);
};

const unsetUserAsAdmin = (userId) => {
  return axios.delete(`${endpoint.updateOrgAdmin}/${userId}`);
};

const setUserToDeactivated = (userId) => {
  return axios.put(`${endpoint.setUserToDeactivated}/${userId}`);
};

const setUserToActive = (userId) => {
  return axios.put(`${endpoint.setUserToActive}/${userId}`);
};

const getOrgInfo = (orgId) => {
  return axios.get(`${endpoint.getOrgInfo}/${orgId}`);
};

const getOrganizationMembers = () => {
  return axios.get(endpoint.orgMembers);
};

const addUserToChannel = ({ channelId }) => {
  return axios.post(endpoint.addUser, { channelId });
};

const getReactionUserNames = (msgId) => {
  return axios.get(`${endpoint.reactionUserNames}?msgId=${msgId}`);
};

export {
  login,
  register,
  isEmailAvailable,
  initChannelMsgs,
  verifyToken,
  userConnection,
  userChannels,
  inviteUser,
  getUserOrganizations,
  getUserInfo,
  getChannelInfo,
  updateChannelVisitTime,
  getOrganizationMembersExceptMe,
  createChannel,
  addMemberstoChannel,
  getInvitations,
  acceptInvitation,
  declineInvitation,
  createChannelAndAddMembers,
  createDmAndAddUser,
  createOrg,
  // addMemberToOrg,
  // removeUserFromOrg,
  setUserAsAdmin,
  unsetUserAsAdmin,
  setUserToDeactivated,
  setUserToActive,
  updateUserInfo,
  changePassword,
  getOrgInfo,
  getOrganizationMembers,
  addUserToChannel,
  loadEarlierMessages,
  getReactionUserNames,
};
