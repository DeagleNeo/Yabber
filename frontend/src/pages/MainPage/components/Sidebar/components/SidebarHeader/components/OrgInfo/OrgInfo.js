import { useState } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import ClickAwayListener from "react-click-away-listener";
import DropdownMenu from "./components/DropdownMenu";
import {
  getInitialLetter,
  stringToColor,
} from "../../../../../../../../utils/letterAvatar";

const OrgInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrgInfoPanel = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const OrgName = styled.span`
  color: #ffffff;
  font-size: 24px;
  font-style: italic;
  font-weight: bold;
`;

const DropdownIcon = styled.span`
  position: relative;
  margin-top: 5px;
  color: #ffa977;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;

const OrgInfo = ({ organization, role }) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  const dropdownMenuToggleHandler = () => {
    setShowDropdownMenu((prev) => !prev);
  };

  const onClickAwayHandler = () => {
    setShowDropdownMenu(false);
  };

  return (
    <OrgInfoContainer>
      <OrgInfoPanel>
        <Avatar
          alt={organization[0].name}
          src={organization[0].name}
          sx={[
            { bgcolor: stringToColor(organization[0].name) },
            { width: 45, height: 45 },
            { fontSize: 25 },
          ]}
        >
          {getInitialLetter(organization[0].name)}
        </Avatar>
        <OrgName>{organization[0].name}</OrgName>
      </OrgInfoPanel>
      <ClickAwayListener onClickAway={onClickAwayHandler}>
        <DropdownIcon
          className="fas fa-ellipsis"
          onClick={dropdownMenuToggleHandler}
        >
          {showDropdownMenu && <DropdownMenu role={role} />}
        </DropdownIcon>
      </ClickAwayListener>
    </OrgInfoContainer>
  );
};

export default OrgInfo;
