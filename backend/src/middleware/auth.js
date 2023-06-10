const { validateToken } = require("../jwt/jwt");

function auth(req, res, next) {
  const authorizationHeader = req.header("Authorization");
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
  req.user = payload;
  next();
}

module.exports = auth;
