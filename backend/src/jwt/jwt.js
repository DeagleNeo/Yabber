const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(payload) {
  const token = jwt.sign(payload, "secret", {
    expiresIn: "7d",
  });
  return `Bearer ${token}`;
}

function validateToken(token) {
  try {
    return jwt.verify(token, "secret");
  } catch (e) {
    return null;
  }
}

module.exports = {
  generateToken,
  validateToken,
};
