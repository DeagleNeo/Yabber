async function sendNewChannelNotification({ type, channelId }) {
  const event = { channel: "newGroup", dm: "newChat" };
  await io.to(channelId.toString()).emit(event[type], " ");
}

module.exports=sendNewChannelNotification