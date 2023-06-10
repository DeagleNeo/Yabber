import { Avatar } from "@mui/material";
import styled from "styled-components";
import { getInitialLetter, stringToColor } from "../../../../../../utils/letterAvatar";

const MyChatStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
`;
const ChatBoxStyle = styled.div`
  box-sizing: border-box;
  /* max-width:650px; */
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: flex-end;
  min-width: 10px;
  margin-bottom: 1.5rem;
  height: 100%;
`;
const ChatContent = styled.div`
  box-sizing: border-box;
  font-size: 14px;
  /* word-break:break-all; */
  min-width: 100px;
  /* display: flex;
  flex-direction: column;
  align-items: flex-end; */
  > i {
    min-width: 90px;
    display: block;
  }
`;
const MessageStyle = styled.div`
  display: block;
  box-sizing: border-box;
  background-color: #e8efff;
  border-radius: 20px 20px 0 20px;
  padding: 14px 20px;
  color: #232323;
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
    color: #909090;
    margin: 0;
    margin-top: 3px;
  }
`;
const AvatarStyle = styled.div`
  padding: 8px 0px 0 15px;
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

const MyChat = ({ msg }) => {
  return (
    <MyChatStyle>
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
    </MyChatStyle>
  );
};

export default MyChat;
