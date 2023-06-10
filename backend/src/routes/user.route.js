const { Router } = require("express");
const {
  connectionSummary,
  register,
  login,
  getUserInfo,
  updateUserInfo,
  changePassword,
  searchUsers,
  isEmailAvailable,
  verifyToken,
  getCurrentUserOrganization,
  checkInvitations,
  InviteUser,
  acceptInvitation,
  declineInvitation,
  // deleteUser,
} = require("../controllers/user.controller");
const adminGuard = require("../middleware/adminGuard");
const auth = require("../middleware/auth");
const orgGuard = require("../middleware/orgGuard");

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/isemailavailable", isEmailAvailable);

// the above routes do not require token to access
userRouter.use(auth);
// the following routes do require token to access

// userRouter.delete("/",  deleteUser);
userRouter.get("/connectionsummary", orgGuard, connectionSummary);
userRouter.get("/info/:userId", getUserInfo);
userRouter.put("/info", updateUserInfo);
userRouter.put("/password", changePassword);
userRouter.get("/search", searchUsers);
userRouter.get("/authentication", verifyToken);
userRouter.get("/organization", getCurrentUserOrganization);
userRouter.get("/invitations", checkInvitations);
userRouter.put("/invitation/add", orgGuard, adminGuard, InviteUser);
userRouter.put("/invitation/accept", acceptInvitation);
userRouter.put("/invitation/decline", declineInvitation);


module.exports = userRouter;
