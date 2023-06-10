const { Router } = require("express");
const auth = require("../middleware/auth");
const orgGuard = require("../middleware/orgGuard");
const userRouter = require("./user.route");
const channelRouter = require("./channel.route");
const msgRouter = require("./message.route");
const orgRouter = require("./organization.route");
const { dbStatus } = require("../database/mongoDB");

const router = Router();

router.use("/users", userRouter);

router.use(auth);

router.use("/orgs", orgRouter);
router.use("/msgs", msgRouter);

router.use(orgGuard);

router.use("/channels", channelRouter);

module.exports = router;
