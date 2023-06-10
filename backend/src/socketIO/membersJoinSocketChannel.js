
const getKeybyValueFromMap = require("../utils/getKeybyValueFromMap");

function membersJoinSocketChannel(memberIdArray, channelId) {
  for (const userId of memberIdArray) {
    const socketId = getKeybyValueFromMap(onlineUsers, userId);
    if (socketId) io.sockets.sockets.get(socketId).join(channelId.toString());
  }
}

module.exports = membersJoinSocketChannel;
