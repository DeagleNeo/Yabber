const { validateToken } = require("../jwt/jwt");

function accountAuth(req, res, next) {
  const authorizationHeader = req.get("X-Auth-Token");
  if (!authorizationHeader) {
    return res.sendStatus(401);
  }

  const tokenArray = authorizationHeader.split(" ");
  if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
    return res.sendStatus(401);
  }

  const payload = validateToken(tokenArray[1]);
  if (!payload) {
    return res.sendStatus(403);
  }
  req.account = payload;
  next();
}

module.exports = accountAuth;
