const { server } = require("../app");
global.io = require("socket.io")(server, { cors: true });
const { addMsg, updateMsgReaction } = require("../services/message.service");
const { getUserById } = require("../services/user.service");

global.onlineUsers = new Map();
let organizationOnlineUsers;

const socketIO = () => {
  io.on("connection", (socket) => {
    socket.on("addUser", async (userId) => {
      // userId type: string, socket id type: string
      onlineUsers.set(socket.id, userId);
      console.log(`Welcome! userId: ${userId}, socketId: ${socket.id}`);
      organizationOnlineUsers = Array.from(onlineUsers.values());
      io.emit("onlineUsers", organizationOnlineUsers);

      const user = await getUserById(userId);
      if (user && user.channels && user.channels.length > 0) {
        user.channels.forEach((channelId) => {
          socket.join(channelId.toString());
        });
      }
    });

    socket.on("sendMsg", async (data) => {
      const msg = await addMsg(data);
      io.to(msg.receiver._id.toString()).emit("receiveMsg", { data: { msg } });
    });

    socket.on("reaction", async (object) => {
      const { userId, messageId, channelId } = object.data;
      await updateMsgReaction(messageId, userId);
      socket.broadcast.to(channelId).emit("reaction", object);
    });

    socket.on("disconnect", () => {
      console.log(
        `Bye! userId: ${onlineUsers.get(socket.id)}, socketId: ${socket.id}`
      );
      onlineUsers.delete(socket.id);
      organizationOnlineUsers = Array.from(onlineUsers.values());
      io.emit("onlineUsers", organizationOnlineUsers);
    });
  });
};

module.exports = { socketIO };
