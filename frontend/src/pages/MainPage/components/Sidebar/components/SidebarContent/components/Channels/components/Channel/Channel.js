import { useContext } from "react";
import styled, { css } from "styled-components";
import { Avatar } from "@mui/material";
import {
  stringToColor,
  getInitialLetter,
} from "../../../../../../../../../../utils/letterAvatar";
import { formatTime } from "../../../../../../../../../../utils/timeFormatter";
import { MultiChannelContext } from "../../../../../../../../../../components/MultiChannel";
import ClickProfileContext from "../../../../../../../../../../components/ClickProfile/ClickProfileContext";
import { updateChannelVisitTime } from "../../../../../../../../../../api/api";
import breakpoints from "../../../../../../../../../../config/breakpoints";

const ChannelContainer = styled.div`
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

const ChannelPanel = styled.div`
  margin-left: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: auto;
`;

const ChannelContent = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
`;

const PrivateChannel = styled.span`
  margin-right: 8px;
  color: #888;
  ${({ active }) =>
    active &&
    css`
      color: #fff;
    `}
`;

const ChannelUsername = styled.div`
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

const ChannelText = styled.div`
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

const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  @media screen and (max-width: 400px) {
    margin-left: -30px;
  }
`;

const AvatarGroup = styled.div`
  display: flex;

`;

const AvatarContainer = styled.div`
  margin-left: -8px;
  border: 2px solid #d8c3e0;
  border-radius: 50%;
  object-fit: cover;
  vertical-align: middle;
  z-index: 0
`;

const AvatarCount = styled.span`
  margin-left: -6px;
  width: 32px;
  height: 32px;
  border: 2px solid #d8c3e0;
  border-radius: 50%;
  border-width: 2px;
  background-color: #5a078b;
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1
`;

const ChannelMessageTime = styled.div`
  color: #6c757d;
  font-size: 12px;
  margin-top: 5px;
  margin-right: 5px;
`;

const Channel = ({
  _id,
  avatar,
  name,
  lastMessage,
  lastMessageCreatedAt,
  members,
  active,
  notification,
  isPrivate,
}) => {
  const multiChannel = useContext(MultiChannelContext);
  const ClickProfile = useContext(ClickProfileContext);

  const onClickHandler = (e) => {
    ClickProfile.setIsSideBarOpen(false);

    multiChannel.currentChannel.current._id &&
      updateChannelVisitTime(
        multiChannel.currentChannel.current._id,
        new Date()
      );
    multiChannel.currentChannel.current = { _id, name, avatar };
    multiChannel.setInitChannel(true);

    ClickProfile.setTab("GROUP");
    ClickProfile.channelList?.forEach((member) => {
      if (member._id === _id) {
        ClickProfile.setChannelInfo(member);
      }
    });
    if (window.screen.width > 800) {
      ClickProfile.setIsDrawerOpen(true);
    }
  };

  return (
    <ChannelContainer active={active} onClick={onClickHandler}>
      <Avatar
        alt={name}
        src={avatar}
        sx={[
          {
            bgcolor: stringToColor(name),
          },
          { width: 40, height: 40 },
          { fontSize: 20 },
        ]}
      >
        {getInitialLetter(name)}
      </Avatar>
      <ChannelPanel>
        <ChannelContent>
          <ChannelUsername active={active}>
            {isPrivate && (
              <PrivateChannel className="fa-solid fa-lock" active={active} />
            )}
            {name}
          </ChannelUsername>
          <ChannelText active={active}>
            {active || !notification ? "" : <span>[{notification}] </span>}
            {lastMessage}
          </ChannelText>
        </ChannelContent>
        <ChannelDetails>
          <AvatarGroup>
            <AvatarContainer>
              {members && (
                <Avatar
                  alt={members[0].firstName + " " + members[0].lastName}
                  src={members[0].avatar}
                  sx={[
                    {
                      bgcolor: stringToColor(
                        members[0].firstName + " " + members[0].lastName
                      ),
                    },
                    { width: 28, height: 28 },
                    { fontSize: 15 },
                  ]}
                >
                  {getInitialLetter(
                    members[0].firstName + " " + members[0].lastName
                  )}
                </Avatar>
              )}
            </AvatarContainer>
            {members && members.length > 1 && (
            <AvatarContainer>
                <Avatar
                  alt={members[1].firstName + " " + members[1].lastName}
                  src={members[1].avatar}
                  sx={[
                    {
                      bgcolor: stringToColor(
                        members[1].firstName + " " + members[1].lastName
                      ),
                    },
                    { width: 28, height: 28 },
                    { fontSize: 15 },
                  ]}
                >
                  {getInitialLetter(
                    members[1].firstName + " " + members[1].lastName
                  )}
                </Avatar>
            </AvatarContainer>
            )}
            {members && members.length > 2 && (
              <AvatarCount>{members.length - 2}+</AvatarCount>
            )}
          </AvatarGroup>
          <ChannelMessageTime
            children={lastMessageCreatedAt && formatTime(lastMessageCreatedAt)}
          />
        </ChannelDetails>
      </ChannelPanel>
    </ChannelContainer>
  );
};

export default Channel;
