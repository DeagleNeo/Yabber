const User = require("../models/user");
const Organization = require("../models/organization");

async function orgGuard(req, res, next) {
  const orgHeader = req.header("X-Current-Org");
  if (!orgHeader) {
    return res.sendStatus(401);
  }

  const { id } = req.user;
  const user = await User.findById(id).exec();
  if (!user || !user.organization || !user.organization.includes(orgHeader)) {
    return res
      .status(403)
      .json({ data: { error: "user not in this organization" } });
  }

  req.org = { orgId: orgHeader };
  next();
}

module.exports = orgGuard;
