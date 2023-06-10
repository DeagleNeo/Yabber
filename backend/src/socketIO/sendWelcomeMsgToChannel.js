const { addMsg } = require("../services/message.service");

async function sendWelcomeMsgToChannel({ userId, channelId, channelName }) {
  const msg = await addMsg({
    sender: userId,
    receiver: channelId,
    content: `hello everyone, welcome to ${channelName}`,
    msgType: "text",
    time: new Date(),
  });
  await io.to(channelId.toString()).emit("receiveMsg", { data: { msg } });
}

module.exports = sendWelcomeMsgToChannel;
