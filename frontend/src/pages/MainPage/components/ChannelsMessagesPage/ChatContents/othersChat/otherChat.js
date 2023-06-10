import { Avatar } from "@mui/material";
import styled from "styled-components";
import { getInitialLetter, stringToColor } from "../../../../../../utils/letterAvatar";

const OtherChatStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
`;
const ChatBoxStyle = styled.div`
  box-sizing: border-box;
  /* width:650px; */
  /* max-width:500px; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  min-width: 10px;
  margin-bottom: 1.5rem;
  height: 100%;
`;
const ChatContent = styled.div`
  box-sizing: border-box;
  font-size: 14px;
  min-width: 100px;
  > i {
    min-width: 90px;
    display: block;
  }
`;
const MessageStyle = styled.div`
  display: block;
  box-sizing: border-box;
  background-color: #5a078b;
  border-radius: 20px 20px 20px 0;
  padding: 14px 20px;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  max-width: 650px;
  overflow-wrap: break-word;
`;
const TimeStyle = styled.div`
  color: #fff;
  margin-top: 2px;
  font-size: 12px;
  font-weight: 400;
  display: flex;
  align-items: center;
  margin-bottom: 0px;
`;
const TimeIcon = styled.div`
  color: rgba(247, 247, 247, 0.5);
  font-weight: 900;
  font-family: "Font Awesome 5 Free";
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  > i {
    display: block;
    font-weight: bold;
    color: #fff;
    margin: 0;
    margin-top: 3px;
  }
`;
const AvatarStyle = styled.div`
  padding: 8px 15px 0 8px;
  display: flex;
  align-items: flex-end;
`;
const NameStyle = styled.div`
  display: block;
  margin-block-start: 2.33em;
  margin-block-end: 2.33em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  margin-bottom: 0;
  color: #8345a8;
  font-size: 14px;
  margin-top: 3px;
`;

const OtherChat = ({ msg }) => {
  return (
    <OtherChatStyle>
      <ChatBoxStyle>
        <AvatarStyle>
          <Avatar
            alt={msg.senderName}
            src={msg.senderAvatar}
            sx={{ bgcolor: stringToColor(msg.senderName) }}
          >
            {getInitialLetter(msg.senderName)}
          </Avatar>
        </AvatarStyle>
        <ChatContent>
          <MessageStyle>
            <span> {msg.content} </span>
            <TimeStyle>
              <TimeIcon>
                <i>{msg.displayTime}</i>
              </TimeIcon>
            </TimeStyle>
          </MessageStyle>
          <NameStyle>{msg.senderName}</NameStyle>
        </ChatContent>
      </ChatBoxStyle>
    </OtherChatStyle>
  );
};

export default OtherChat;
