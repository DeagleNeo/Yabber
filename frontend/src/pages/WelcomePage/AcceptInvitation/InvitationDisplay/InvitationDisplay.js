import styled from "styled-components";
import { acceptInvitation, declineInvitation } from "../../../../api/api";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

const InvitationContainer = styled.div`
  /* display: grid; */
  display: flex;
  flex-wrap: wrap;
  /* grid-template-columns: 5px 1fr 120px 120px 20px; */
  align-items: center;
  /* justify-content: center; */
  justify-content: space-between;
  /* position: static; */
  /* padding-bottom: 14px; */
  margin: 10px 0;
`;

const OrganizationName = styled.span`
  display: inline-block;
  margin: 5px;
  font-size: 1.7rem;
  color: #6f6f6f;
  font-weight: bold;
  /* position: relative;
  &::after {
    content: attr(data-hover);
    opacity: 0;
    position: absolute;
    top: -20px;
    left: 75px;
    font-size: 1rem;
    color: #a0daee;
  }
  &:hover::after {
    opacity: 1;
  } */

  @media screen and (max-width: 520px) {
    font-size: 1.3rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Button = styled.button`
  margin: 5px;
  width: 100px;
  height: 35px;
  border-radius: 30px;
  background: transparent;
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffffff;
  outline: none;
  border: none;
  box-shadow: 2px 2px 2px #888888;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 8px #bbbbbb, 2px -2px 8px #bbbbbb, -2px 2px 8px #bbbbbb,
      -2px -2px 8px #bbbbbb;
  }

  @media screen and (max-width: 520px) {
    font-size: 0.9rem;
    width: 90px;
    height: 32px;
  }
`;

const AcceptBtn = styled(Button)`
  background-color: #039c09;
  &::after {
    content: "ACCEPT";
  }
`;

const DeclineBtn = styled(Button)`
  background-color: #d1291f;
  &::after {
    content: "DECLINE";
  }
`;

const InvitationDisplay = ({ orgId, name, description, setInvitations }) => {
  const [loading, setLoading] = useState(false);

  const accept = () => {
    setLoading(true);
    acceptInvitation(orgId)
      .then((res) => window.location.reload())
      // refresh the page, the user will be able to access mainpage
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const decline = () => {
    setLoading(true);
    declineInvitation(orgId)
      .then((res) => setInvitations(res.data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const progressStyle = {
    position: "absolute",
    color: "blue",
    right: "360px",
  };

  return (
    <InvitationContainer>
      <OrganizationName data-hover={description}>{name}</OrganizationName>
      <ButtonContainer>
        {loading && <CircularProgress size={22} sx={progressStyle} />}
        <AcceptBtn onClick={accept} />
        <DeclineBtn onClick={decline} />      
      </ButtonContainer>
    </InvitationContainer>
  );
};

export default InvitationDisplay;
