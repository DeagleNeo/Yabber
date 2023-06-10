import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ModalsContext from "../../../../../../../ModalsContext";
import { MultiChannelContext } from "../../../../../../../../../../components/MultiChannel";
import { updateChannelVisitTime } from "../../../../../../../../../../api/api";

const DropdownContainer = styled.div`
  position: absolute;
  min-width: 10rem;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  display: block;
  inset: 0px 0px auto auto;
  transform: translate(0px, 22px);
  z-index: 999;
`;

const DropdownMenuItem = styled.div`
  width: 160px;
  height: 35px;
  padding: 7px 14px;
  box-sizing: border-box;
  background-color: transparent;
  border-radius: 6px;
  color: #000;
  font-size: 14px;
  font-family: Lato, sans-serif;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background-color: #e9ecef;
  }
`;

const DropdownMenu = ({ role }) => {
  const { showCreateGroupModal } = useContext(ModalsContext);
  const multiChannel = useContext(MultiChannelContext);
  const navigate = useNavigate();

  const settingsClickHandler = () => {
    navigate("/settings");
  };

  const logoutClickHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentOrg");

    multiChannel.currentChannel.current._id &&
      updateChannelVisitTime(
        multiChannel.currentChannel.current._id,
        new Date()
      );
    navigate("/login");
  };

  const switchClickHandler = () => {
    multiChannel.currentChannel.current._id &&
      updateChannelVisitTime(
        multiChannel.currentChannel.current._id,
        new Date()
      );
    navigate("/welcome");
  };

  const adminClickHandler = () => {
    multiChannel.currentChannel.current._id &&
      updateChannelVisitTime(
        multiChannel.currentChannel.current._id,
        new Date()
      );
    navigate("/admin");
  };

  return (
    <DropdownContainer>
      <DropdownMenuItem
        children="Switch Organizations"
        onClick={switchClickHandler}
      />
      {(role === "owner" || role === "admin") && (
        <DropdownMenuItem
          children={"Manage Members"}
          onClick={adminClickHandler}
        />
      )}
      <DropdownMenuItem children="New Group" onClick={showCreateGroupModal} />
      <DropdownMenuItem children="Settings" onClick={settingsClickHandler} />
      <DropdownMenuItem children="Logout" onClick={logoutClickHandler} />
    </DropdownContainer>
  );
};

export default DropdownMenu;
