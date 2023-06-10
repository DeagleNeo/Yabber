import { useContext } from "react";
import styled, { css } from "styled-components";
import { getInitialLetter } from "../../../../../../../../../../utils/letterAvatar";
import { formatTime } from "../../../../../../../../../../utils/timeFormatter";
import { MultiChannelContext } from "../../../../../../../../../../components/MultiChannel";
import ClickProfileContext from "../../../../../../../../../../components/ClickProfile/ClickProfileContext";
import {
  updateChannelVisitTime,
  getUserInfo,
} from "../../../../../../../../../../api/api";
import AvatarWithStatus from "../../../../../../../AvatarWithStatus";
import { SocketContext } from "../../../../../../../SocketIoContext";

const DirectMessageContainer = styled.div`
  background-color: #fff;
  height: 80px;
  padding: 15px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
    0 0 0 1px rgb(10 10 10 / 2%);
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f9f9f9;
    cursor: pointer;

    ${({ active }) =>
      active &&
      css`
        background-color: #5a078b;
        border-left: 5px solid #ffa977;
      `}
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #5a078b;
      border-left: 5px solid #ffa977;
    `}
`;

const DirectMessagePanel = styled.div`
  margin-left: 15px;
  display: flex;
  justify-content: space-between;
  flex: auto;
`;

const DirectMessageContent = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
`;

const DirectMessageUsername = styled.div`
  color: #ffa977;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${({ active }) =>
    active &&
    css`
      color: #fff;
    `}
`;

const DirectMessageText = styled.div`
  color: #181c2f;
  font-size: 14px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${({ active }) =>
    active &&
    css`
      color: #fff;
    `}

  span {
    color: red;
    font-weight: bold;
  }
`;

const DirectMessageTime = styled.div`
  color: #6c757d;
  font-size: 12px;
`;

const DirectMessage = ({
  _id,
  avatar,
  name,
  dmUserId,
  lastMessage,
  lastMessageCreatedAt,
  active,
  notification,
}) => {
  const multiChannel = useContext(MultiChannelContext);
  const ClickProfile = useContext(ClickProfileContext);
  const { onlineUsers } = useContext(SocketContext);

  const onClickHandler = (e) => {
    ClickProfile.setIsSideBarOpen(false);
    
    multiChannel.currentChannel.current._id &&
      updateChannelVisitTime(
        multiChannel.currentChannel.current._id,
        new Date()
      );
    multiChannel.currentChannel.current = { _id, name, avatar };
    multiChannel.setInitChannel(true);

    getUserInfo(dmUserId).then(async (response) => {
      ClickProfile.setUserInfo(await response.data.data.user);
    });
    if (window.screen.width > 800) {
      ClickProfile.setIsDrawerOpen(true);
    }
  };

  return (
    <DirectMessageContainer active={active} onClick={onClickHandler}>
      <AvatarWithStatus
        avatar={avatar}
        name={name}
        status={onlineUsers.some((userId) => userId === dmUserId.toString())}
      >
        {getInitialLetter(name)}
      </AvatarWithStatus>
      <DirectMessagePanel>
        <DirectMessageContent>
          <DirectMessageUsername active={active} children={name} />
          <DirectMessageText active={active}>
            {active || !notification ? "" : <span>[{notification}] </span>}
            {lastMessage}
          </DirectMessageText>
        </DirectMessageContent>
        <DirectMessageTime
          children={lastMessageCreatedAt && formatTime(lastMessageCreatedAt)}
        />
      </DirectMessagePanel>
    </DirectMessageContainer>
  );
};

export default DirectMessage;
