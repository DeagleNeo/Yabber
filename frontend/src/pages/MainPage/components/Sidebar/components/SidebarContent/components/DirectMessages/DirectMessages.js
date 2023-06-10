import { useContext } from "react";
import { MultiChannelContext } from "../../../../../../../../components/MultiChannel";
import DirectMessage from "./components/DirectMessage";

const DirectMessages = ({ dms, query }) => {
  const multiChannel = useContext(MultiChannelContext);

  const filteredDms = dms.filter((item) => {
    if (item.name.match(new RegExp(query, "i"))) return item;
    return null;
  });

  return (
    <>
      {filteredDms.map((dm) => (
        <DirectMessage
          _id={dm._id}
          key={dm._id}
          dmUserId={dm.statusId}
          avatar={dm.avatar}
          name={dm.name}
          lastMessage={dm.lastMessage.content}
          lastMessageCreatedAt={dm.lastMessage.time}
          active={multiChannel.currentChannel.current._id === dm._id}
          notification={dm.notification}
        />
      ))}
    </>
  );
};

export default DirectMessages;
