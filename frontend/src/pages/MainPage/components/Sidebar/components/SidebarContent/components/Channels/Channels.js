import { useContext, useEffect } from "react";
import { MultiChannelContext } from "../../../../../../../../components/MultiChannel";
import Channel from "./components/Channel";
import ClickProfileContext from "../../../../../../../../components/ClickProfile/ClickProfileContext";

const selectearliestArrayElements = (array, number) => {
  if (!number) return array;
  if (array.length <= number) return array;
  return array.slice(0, number - 1);
};

const Channels = ({ channels, query }) => {
  const multiChannel = useContext(MultiChannelContext);

  const { setChannelList } = useContext(ClickProfileContext);

  useEffect(() => {
    setChannelList(channels);
  }, [channels, setChannelList]);

  const filteredChannels = channels.filter((item) => {
    if (item.name.match(new RegExp(query, "i"))) return item;
    return null;
  });

  return (
    <>
      {selectearliestArrayElements(filteredChannels, 20).map((channel) => (
        <Channel
          _id={channel._id}
          key={channel._id}
          avatar={channel.avatar}
          name={channel.name}
          lastMessage={channel.lastMessage.content}
          lastMessageCreatedAt={channel.lastMessage.time}
          members={channel.members}
          active={multiChannel.currentChannel.current._id === channel._id}
          notification={channel.notification}
          isPrivate={channel.isPrivate}
        />
      ))}
    </>
  );
};

export default Channels;
