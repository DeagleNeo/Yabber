import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  useLayoutEffect,
} from "react";
import styled from "styled-components";
// import OthersChat from "./othersChat";
// import MyChat from "./myChat";
import DivideLine from "./DataDivideLine/dataDivideLine";
import { initChannelMsgs, loadEarlierMessages } from "../../../../../api/api";
import { MultiChannelContext } from "../../../../../components/MultiChannel";
import chatBackground from "../../../../../assets/chatBackground.png";
import Message from "./Message";
import EarlierMessagesSign from "../components/EarlierMessagesSign";
import NewMessageSign from "../components/NewMessageSign/NewMessageSign";
import { SocketContext } from "../../SocketIoContext/SocketIoContext";

const ChatContentsStyle = styled.div`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 95%;
  height: 80%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  background-image: url(${chatBackground});
  background-repeat: repeat;
  position: relative;
`;

const ChatStyle = styled.div`
  top: 0;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start;
  align-items: flex-start; */
  gap: 5px;
  padding: 5px;
`;
// const ChatStyleRev = styled.div`
//   position: relative;
//   top: 0;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-end;
//   font-size: 1rem;
//   gap: 5px;
//   padding: 5px;
// `;

const verticalPositionToBottom = (element) => {
  if (
    (element.scrollHeight || element.clientHeight || element.scrollTop) == null
  )
    return 0;
  return Math.abs(
    element.scrollHeight - element.clientHeight - element.scrollTop
  );
};

const ChatContents = ({ socket, currentUser }) => {
  const scrollRef = useRef();
  const [moreMsg, setMoreMsg] = useState();
  const [messages, setMessages] = useState([]);
  const lastMsgDate = useRef("");
  const [currentScrollPosition, setCurrentScrollPosition] = useState(); //initial value will be 0, before any message is loaded
  const [showNewMsgSign, setShowNewMsgSign] = useState(false);
  const [trigger, setTrigger] = useState("");
  const firstNewMessage = useRef();
  const MsgContainer = useRef();
  const currentPosition = useRef({
    scrollHeight: 0,
    scrollTop: 0,
    scrollBottom: 0,
  });

  const multiChannel = useContext(MultiChannelContext);
  const { reaction } = useContext(SocketContext);

  const getScrollBarBottomPosition = (e) => {
    setCurrentScrollPosition(verticalPositionToBottom(e.target));
    if (currentScrollPosition < 30) setShowNewMsgSign(false);
  };

  const viewNewMsg = () => {
    firstNewMessage.current.scrollIntoView();
    if (verticalPositionToBottom(MsgContainer.current) < 30)
      setShowNewMsgSign(false);
  };

  const getEarlierMessages = () => {
    loadEarlierMessages(
      multiChannel.currentChannel.current._id,
      messages[0]?._id,
      50
    ).then(async (response) => {
      const earlierMessages = await response.data.data.msgs;
      setMoreMsg(earlierMessages.length === 50);
      const formatedMsg = earlierMessages.map((msg) => formatDisplayMsg(msg));
      setMessages((prev) => [...formatedMsg, ...prev]);
      setTrigger("earlierMsg");
      currentPosition.current.scrollHeight = MsgContainer.current.scrollHeight;
      currentPosition.current.scrollTop = MsgContainer.current.scrollTop;
    });
  };

  useEffect(() => {
    if (!showNewMsgSign) firstNewMessage.current = null;
  }, [showNewMsgSign]);

  const formatDisplayMsg = useCallback(
    (msg) => {
      let fromSelf = false;
      const { _id, sender, content, time, msgType, imageUrl } = msg;
      if (sender._id.toString() === currentUser._id) {
        fromSelf = true;
      }
      const localTime = new Date(time);
      const hours = localTime.getHours();
      const minutes = localTime.getMinutes();
      const displayTime = `${hours > 9 ? hours : "0" + hours} : ${
        minutes > 9 ? minutes : "0" + minutes
      }`;
      const date = localTime.toDateString();
      const senderAvatar = sender.avatar;
      const senderName = `${sender.firstName} ${sender.lastName}`;
      const reaction = msg.reaction;
      return {
        _id,
        content,
        displayTime,
        date,
        senderAvatar,
        senderName,
        fromSelf,
        msgType,
        reaction,
        imageUrl,
      };
    },
    [currentUser]
  );

  // msg from express
  useEffect(() => {
    const messageNumber = 50;
    if (multiChannel.initChannel && multiChannel.currentChannel.current._id) {
      initChannelMsgs(
        multiChannel.currentChannel.current._id,
        messageNumber
      ).then(async (response) => {
        const historyMessages = await response.data.data.msgs;
        if (historyMessages.length === messageNumber) setMoreMsg(true);
        historyMessages &&
          setMessages(historyMessages.map((msg) => formatDisplayMsg(msg)));
        setTrigger("initialization");
      });
      multiChannel.setInitChannel(false);
      return () => {
        setShowNewMsgSign(false);
        setMoreMsg(null);
      };
    }
  }, [multiChannel.initChannel, formatDisplayMsg]); // eslint-disable-line

  //msg from socket
  useEffect(() => {
    const socketInstance = socket.current; //to satisfy eslint warning
    socket.current?.on("receiveMsg", (data) => {
      const { receiver, content, time, msgType } = data.data.msg;
      multiChannel.setLastMessage({
        channelId: receiver._id,
        content,
        time,
        msgType,
      });
      if (
        receiver._id.toString() ===
        multiChannel.currentChannel.current._id.toString()
      ) {
        setMessages((prev) => [...prev, formatDisplayMsg(data.data.msg)]);
        setTrigger("socket");
        currentPosition.current.scrollBottom = verticalPositionToBottom(
          MsgContainer.current
        );
      }
    });
    return () => {
      socketInstance?.off("receiveMsg");
    };
  }, [currentUser, formatDisplayMsg]); // eslint-disable-line

  useLayoutEffect(() => {
    const handleScrollPosition = (trigger, currentPosition) => {
      if (trigger === "socket" && currentPosition.current.scrollBottom < 100) {
        scrollRef.current?.scrollIntoView({ block: "end" });
      }

      if (trigger === "socket" && currentPosition.current.scrollBottom >= 100) {
        setShowNewMsgSign(true);
        if (!firstNewMessage.current)
          firstNewMessage.current = scrollRef.current;
      }

      if (trigger === "initialization") {
        scrollRef.current?.scrollIntoView({ block: "end" });
      }

      if (trigger === "earlierMsg") {
        MsgContainer.current.scrollTop =
          MsgContainer.current.scrollHeight -
          currentPosition.current.scrollHeight +
          currentPosition.current.scrollTop;
      }
    };

    messages && handleScrollPosition(trigger, currentPosition);
  }, [messages, trigger]);

  const toggleReaction = ({ userId, messageId }) => {
    setTrigger("reaction");
    setMessages((currentMsgs) => {
      const newMessages = JSON.parse(JSON.stringify(currentMsgs));
      const reaction = newMessages.find(
        (msg) => msg._id === messageId
      )?.reaction;

      if (reaction.includes(userId)) {
        reaction.splice(reaction.indexOf(userId), 1);
        return newMessages;
      }
      if (!reaction.includes(userId)) {
        reaction.push(userId);
      }
      return newMessages;
    });
  };

  const handleLocalReaction = (messageId) => {
    const userId = currentUser._id;
    toggleReaction({ userId, messageId });

    const channelId = multiChannel.currentChannel.current._id;
    socket.current.emit("reaction", { data: { userId, messageId, channelId } });
  };

  // handle incoming reaction update
  useEffect(() => {
    const { userId, messageId, channelId } = reaction;
    if (channelId === multiChannel.currentChannel.current._id) {
      toggleReaction({ userId, messageId });
    }
  }, [reaction, multiChannel.currentChannel]);

  return (
    <ChatContentsStyle ref={MsgContainer} onScroll={getScrollBarBottomPosition}>
      <EarlierMessagesSign onClick={getEarlierMessages} moreMsg={moreMsg} />

      {messages.map((msg) => {
        let visible = false;
        if (msg.date !== lastMsgDate.current) {
          lastMsgDate.current = msg.date;
          visible = true;
        }
        return (
          <div key={msg._id}>
            {visible && <DivideLine date={msg.date} />}
            <ChatStyle ref={scrollRef}>
              <Message msg={msg} handleLocalReaction={handleLocalReaction} />
            </ChatStyle>
          </div>
        );
      })}
      {showNewMsgSign && <NewMessageSign onClick={viewNewMsg} />}
    </ChatContentsStyle>
  );
};

export default ChatContents;
