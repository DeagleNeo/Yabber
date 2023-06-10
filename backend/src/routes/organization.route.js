const { Router } = require("express");
// const auth=require('../middleware/auth');
// const getOrganization=require('../middleware/getOrganization')
const orgGuard = require("../middleware/orgGuard");

const {
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
} = require("../controllers/organization.controller");

const orgRouter = Router();

// orgRouter.use(auth);
// orgRouter.use(getOrganization);

orgRouter.post("/create", createOrg);
// orgRouter.delete("/:orgId", deleteOrg);

orgRouter.use(orgGuard);

orgRouter.get("/info/:orgId", getOrgInfo);
orgRouter.put("/info", updateOrgInfo);
orgRouter.put("/member/:userId", addUserToOrg);
orgRouter.delete("/member/:userId", removeUserFromOrg);
orgRouter.put("/admin/:userId", setUserAsAdmin);
orgRouter.delete("/admin/:userId", unsetUserAsAdmin);
orgRouter.get('/members', getOrganizationMembers);
orgRouter.get('/othermembers', getOtherMembersInOrganization);
orgRouter.put("/deactivated/:userId", setUserToDeactivated);
orgRouter.put("/active/:userId", setUserToActive);

module.exports = orgRouter;
