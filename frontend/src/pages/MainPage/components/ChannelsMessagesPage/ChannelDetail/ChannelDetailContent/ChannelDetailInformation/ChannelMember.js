import { useState, useContext } from "react";
import styled, { css } from "styled-components";
import ClickAwayListener from "react-click-away-listener";
import { getInitialLetter } from "../../../../../../../utils/letterAvatar";
import AvatarWithStatus from "../../../../AvatarWithStatus/AvatarWithStatus";
import { SocketContext } from "../../../../SocketIoContext";

const ColleagueContainer = styled.div`
  background-color: #fff;
  height: 60px;
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #f1f1f1;
  box-sizing: border-box;
  border-radius: 3px;
  box-shadow: 0px 4px 4px #f5f8ff;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f9f9f9;
    cursor: pointer;

    /* ${({ active }) =>
      active &&
      css`
        background-color: #5a078b;
        border-left: 5px solid #ffa977;
      `} */
  }

  /* ${({ active }) =>
    active &&
    css`
      background-color: #5a078b;
      border-left: 5px solid #ffa977;
    `} */
`;

const ColleagueName = styled.div`
  margin-left: 10px;
  color: #4b0973;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  /* ${({ active }) =>
    active &&
    css`
      color: #fff;
    `} */
`;

const ChannelMember = ({ avatar, name, id }) => {
  const [activeColleague, setActiveColleague] = useState(false);
  const { onlineUsers } = useContext(SocketContext);

  const onClickHandler = (e) => {
    setActiveColleague(!activeColleague);
  };

  const onClickAwayHandler = (e) => {
    setActiveColleague(false);
  };

  return (
    <ClickAwayListener onClickAway={onClickAwayHandler}>
      <ColleagueContainer active={activeColleague} onClick={onClickHandler}>
        <AvatarWithStatus
          avatar={avatar}
          name={name}
          status={onlineUsers.some((userId) => userId === id.toString())}
        >
          {getInitialLetter(name)}
        </AvatarWithStatus>
        <ColleagueName active={activeColleague} children={name} />
      </ColleagueContainer>
    </ClickAwayListener>
  );
};

export default ChannelMember;
