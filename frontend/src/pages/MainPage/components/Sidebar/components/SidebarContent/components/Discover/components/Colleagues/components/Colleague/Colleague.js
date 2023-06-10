import { useContext, useState } from "react";
import styled, { css } from "styled-components";
import ClickAwayListener from "react-click-away-listener";
import { getInitialLetter } from "../../../../../../../../../../../../utils/letterAvatar";
import { getUserInfo } from "../../../../../../../../../../../../api/api";
import ClickProfileContext from "../../../../../../../../../../../../components/ClickProfile/ClickProfileContext";
import ModalsContext from "../../../../../../../../../../components/ModalsContext";
import AvatarWithStatus from "../../../../../../../../../AvatarWithStatus/AvatarWithStatus";
import { SocketContext } from "../../../../../../../../../SocketIoContext";

const ContactButton = styled.button`
  padding: 10px;
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

const ColleagueContainer = styled.div`
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

  &:hover ${ContactButton} {
    opacity: 1;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #5a078b;
      border-left: 5px solid #ffa977;
    `}
`;

const ColleaguePanel = styled.div`
  margin-left: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: auto;
`;

const ColleagueName = styled.div`
  color: #ffa977;
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

const Colleague = ({ _id, name, avatar }) => {
  const [isActiveColleague, setIsActiveColleague] = useState(false);
  const ClickProfile = useContext(ClickProfileContext);
  const {
    setActiveColleague,
    setActiveColleagueId,
    showCreateChatModal,
  } = useContext(ModalsContext);
  const { onlineUsers } = useContext(SocketContext);

  const colleagueClickHandler = () => {
    ClickProfile.setIsSideBarOpen(false);

    setIsActiveColleague(true);
    setActiveColleague(name);
    setActiveColleagueId(_id);

    ClickProfile.setTab("CHAT");
    getUserInfo(_id).then(async (response) => {
      ClickProfile.setUserInfo(await response.data.data.user);
    });
    if (window.screen.width > 800) {
      ClickProfile.setIsDrawerOpen(true);
    }
  };

  const contactButtonClickHandler = () => {
    showCreateChatModal();
  };

  const onClickAwayHandler = () => {
    setIsActiveColleague(false);
  };

  return (
    <ClickAwayListener onClickAway={onClickAwayHandler}>
      <ColleagueContainer
        active={isActiveColleague}
        onClick={colleagueClickHandler}
      >
        <AvatarWithStatus
          name={name}
          avatar={avatar}
          status={
            _id && onlineUsers.some((userId) => userId === _id.toString())
          }
        >
          {getInitialLetter(name)}
        </AvatarWithStatus>
        <ColleaguePanel>
          <ColleagueName active={isActiveColleague} children={name} />
          <ContactButton
            className="fas fa-comments home-message-icon"
            active={isActiveColleague}
            onClick={contactButtonClickHandler}
          />
        </ColleaguePanel>
      </ColleagueContainer>
    </ClickAwayListener>
  );
};

export default Colleague;
