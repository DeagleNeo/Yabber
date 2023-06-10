const User = require("../models/user");
const Organization = require("../models/organization");

async function getOrganization(req, res, next) {
  const { id } = req.user;
  const user = await User.findById(id).exec();
  req.organization={}
  req.organization.id = user.organization[0]._id;
  if (!req.organization.id)
    return res
      .status(404)
      .json({ data: { error: "user not in any organization" } });
  next();
}

module.exports = getOrganization;
