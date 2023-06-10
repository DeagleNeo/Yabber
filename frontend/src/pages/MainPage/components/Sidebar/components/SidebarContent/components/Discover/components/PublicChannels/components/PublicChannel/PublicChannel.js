import { useState, useContext } from "react";
import styled, { css } from "styled-components";
import { Avatar } from "@mui/material";
import ClickAwayListener from "react-click-away-listener";
import {
  getInitialLetter,
  stringToColor,
} from "../../../../../../../../../../../../utils/letterAvatar";
import { getChannelInfo } from "../../../../../../../../../../../../api/api";
import ClickProfileContext from "../../../../../../../../../../../../components/ClickProfile/ClickProfileContext";
import ModalsContext from "../../../../../../../../../ModalsContext";

const JoinButton = styled.button`
  padding: 7px;
  color: #fff;
  background-color: #5a078b;

  border: none;
  border-radius: 50%;
  outline: none;
  opacity: 0;

  &:hover {
    cursor: pointer;
  }

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      color: #5a078b;
      background-color: #fff;
    `}
`;

const PublicChannelContainer = styled.div`
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

  &:hover ${JoinButton} {
    opacity: 1;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #5a078b;
      border-left: 5px solid #ffa977;
    `}
`;

const PublicChannelPanel = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  flex: auto;
`;

const PublicChannelName = styled.div`
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

const PublicChannelDesc = styled.div`
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
`;

const PublicChannel = ({ _id, name, desc, avatar }) => {
  const [isActiveGroup, setIsActiveGroup] = useState(false);
  const ClickProfile = useContext(ClickProfileContext);
  const { setActiveGroup, setActiveGroupId, showJoinGroupModal } =
    useContext(ModalsContext);

  const publicChannelClickHandler = (e) => {
    ClickProfile.setIsSideBarOpen(false);
    
    setIsActiveGroup(true);
    setActiveGroup(name);
    setActiveGroupId(_id);

    ClickProfile.setTab("GROUP");
    getChannelInfo(_id).then(async (response) => {
      ClickProfile.setChannelInfo(response.data.data.channel);
    });
    if (window.screen.width > 800) {
      ClickProfile.setIsDrawerOpen(true);
    }
  };

  const joinButtonClickHandler = () => {
    showJoinGroupModal();
  };

  const onClickAwayHandler = (e) => {
    setIsActiveGroup(false);
  };

  return (
    <ClickAwayListener onClickAway={onClickAwayHandler}>
      <PublicChannelContainer
        active={isActiveGroup}
        onClick={publicChannelClickHandler}
      >
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
        <PublicChannelPanel>
          <PublicChannelName active={isActiveGroup} children={name} />
          <PublicChannelDesc active={isActiveGroup} children={desc} />
        </PublicChannelPanel>
        <JoinButton
          className="fa-solid fa-plus"
          active={isActiveGroup}
          onClick={joinButtonClickHandler}
        />
      </PublicChannelContainer>
    </ClickAwayListener>
  );
};

export default PublicChannel;
