function generateFullName(user) {
  // requires a user document as argument
  user.firstName = user.firstName || "";
  user.lastName = user.lastName || "";
  return user.firstName + " " + user.lastName;
}

module.exports = generateFullName;
