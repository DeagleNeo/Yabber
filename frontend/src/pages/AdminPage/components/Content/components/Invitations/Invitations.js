import styled from "styled-components";
import InvitationForm from "./components/InvitationForm";

const InvitationsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Invitations = () => {
  return (
    <InvitationsWrapper>
      <InvitationForm /> 
    </InvitationsWrapper>
  )
}

export default Invitations;