// const User = require("../models/user");

// async function adminGuard(req, res, next) {
//   const user = await User.findById(req.user.id)
//     .select({ password: 0 })
//     .populate({ path: "organization", select: "_id owner admin" })
//     .exec();

//   if (
//     !user ||
//     user.organization.length === 0 ||
//     (user.organization[0].owner.toString() !== user._id.toString() &&
//       !user.organization[0].admin.includes(user._id))
//   ) {
//     return res.sendStatus(403);
//   }

//   req.user.orgId = user.organization[0]._id;
//   next();
// }

// module.exports = adminGuard;

const Organization = require("../models/organization");

async function adminGuard(req, res, next) {
  const org = await Organization.findById(req.org.orgId).exec();

  if (
    !org ||
    (org.owner.toString() !== req.user.id.toString() &&
      !org.admin.includes(req.user.id))
  ) {
    return res.sendStatus(403);
  }

  req.user.orgId = org._id;
  next();
}

module.exports = adminGuard;
