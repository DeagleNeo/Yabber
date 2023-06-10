import { Avatar } from "@mui/material";
import styled from "styled-components";
import {
  getInitialLetter,
  stringToColor,
} from "../../../../../../utils/letterAvatar";
import Reaction from "./Reaction";
import thumbsup from "../../../../../../assets/thumbsup.svg";
import thumbsup_white from "../../../../../../assets/thumbsup_white.svg";

const MessageWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${({ isFromSelf }) => (isFromSelf ? "flex-end" : "flex-start")};
  height: 100%;
  position: relative;
`;

const MessageContainer = styled.div`
  box-sizing: border-box;
  /* max-width: 75%; */
  /* max-width: 650px; */
  display: flex;
  flex-direction: ${({ isFromSelf }) => (isFromSelf ? "row-reverse" : "row")};
  justify-content: ${({ isFromSelf }) =>
    isFromSelf ? "flex-end" : "flex-start"};
  align-items: flex-end;
  min-width: 10px;
  margin-bottom: 1.5rem;
  position: relative;
  height: 100%;
`;

const MessageContent = styled.div`
  box-sizing: border-box;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: ${({ isFromSelf }) => (isFromSelf ? "flex-end" : "flex-start")};
`;

const ContentStyle = styled.div`
  display: block;
  box-sizing: border-box;
  background-color: ${({ isFromSelf }) => (isFromSelf ? "#e8efff" : "#5a078b")};
  border-radius: ${({ isFromSelf }) =>
    isFromSelf ? "20px 20px 0 20px" : "20px 20px 20px 0"};
  padding: 14px 20px;
  position: relative;
  &:hover button {
    display: inline;
  }
  @media screen and (max-width: 560px) {
    padding: 14px;
  }
`;

const LikeButton = styled.button`
  display: none;
  outline: none;
  background-color: transparent;
  position: absolute;
  background-image: url(${({ isFromSelf }) => isFromSelf ? thumbsup : thumbsup_white});
  background-size: 100%;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  border: none;
  bottom: 7px;
  right: 7px;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
`;

const Content = styled.span`
  display: block;
  color: ${({ isFromSelf }) => (isFromSelf ? "#232323" : "#fff")};
  font-weight: 500;
  font-size: 16px;
  max-width: 650px;
  overflow-wrap: break-word;

  @media screen and (max-width: 1280px) {
    max-width: 450px;
  }

  @media screen and (max-width: 1070px) {
    max-width: 350px;
  }

  @media screen and (min-width: 800px) and (max-width: 960px) {
    max-width: 200px;
    font-size: 14px;
  }

  @media screen and (max-width: 560px) {
    max-width: 235px;
    font-size: 14px;
  }

  @media screen and (max-width: 420px) {
    max-width: 150px;
    font-size: 12px;
  }

  @media screen and (max-width: 330px) {
    max-width: 100px;
    font-size: 12px;
  }
`;

const Time = styled.span`
  display: block;
  color: ${({ isFromSelf }) => (isFromSelf ? "#909090" : "#d0d0d0")};
  margin-top: 2px;
  font-size: 12px;
  font-weight: 500;

  @media screen and (min-width: 800px) and (max-width: 960px) {
    font-size: 10px;
  }

  @media screen and (max-width: 560px) {
    font-size: 10px;
  }

  @media screen and (max-width: 420px) {
    font-size: 9px;
  }
`;

const AvatarStyle = styled.div`
  padding: 0 10px;
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
  font-size: 16px;
  margin-top: 3px;

  @media screen and (min-width: 800px) and (max-width: 960px) {
    font-size: 14px;
  }

  @media screen and (max-width: 560px) {
    font-size: 14px;
  }

  @media screen and (max-width: 420px) {
    font-size: 12px;
  }
`;

const Message = ({ msg, handleLocalReaction }) => {
  const toggleReactionForCurrentMsg = () => {
    return handleLocalReaction(msg._id);
  };
  const { msgType, imageUrl } = msg;

  return (
    <MessageWrapper isFromSelf={msg.fromSelf}>
      <MessageContainer isFromSelf={msg.fromSelf}>
        <AvatarStyle isFromSelf={msg.fromSelf}>
          <Avatar
            alt={msg.senderName}
            src={msg.senderAvatar}
            sx={[
              { bgcolor: stringToColor(msg.senderName) },
              {
                "@media screen and (max-width: 800px)": {
                  width: 30,
                  height: 30,
                },
              },
              {
                "@media screen and (max-width: 800px)": {
                  fontSize: 14,
                },
              },
            ]}
          >
            {getInitialLetter(msg.senderName)}
          </Avatar>
        </AvatarStyle>
        <MessageContent isFromSelf={msg.fromSelf}>
          {msgType === "text" && (
            <ContentStyle isFromSelf={msg.fromSelf}>
              <LikeButton
                isFromSelf={msg.fromSelf}
                onClick={toggleReactionForCurrentMsg}
              />
              <Content isFromSelf={msg.fromSelf}> {msg.content} </Content>
              <Time isFromSelf={msg.fromSelf}> {msg.displayTime} </Time>
            </ContentStyle>
          )}

          {msgType === "image" && (
            <img src={imageUrl} loading="lazy" alt="GIFs" height={250} />
          )}
          <NameStyle> {msg.senderName} </NameStyle>
        </MessageContent>
        {msg.reaction.length > 0 && (
          <Reaction
            msgId={msg._id}
            list={msg.reaction}
            toggleReactionForCurrentMsg={toggleReactionForCurrentMsg}
          />
        )}
      </MessageContainer>
    </MessageWrapper>
  );
};

export default Message;
