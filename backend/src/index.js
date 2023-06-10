const { server } = require("./app");
const { connectToMongoDB } = require("./database/mongoDB");
const { socketIO } = require("./socketIO/socketIO");
require("dotenv").config();

connectToMongoDB();
socketIO();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

server.keepAliveTimeout = 65000
// try to solve 502 error
// https://www.tessian.com/blog/how-to-fix-http-502-errors/