import styled from "styled-components";
import FormBody from "./components/FormBody/FormBody";
import FormTitle from "./components/FormTitle/FormTitle";

const InvitationFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 500px;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  margin-bottom: 1.875rem;
  overflow: hidden;
`;

const InvitationForm = () => {
  return (
    <InvitationFormWrapper>
      <FormTitle>Invitation</FormTitle>
      <FormBody />
    </InvitationFormWrapper>
  )
}

export default InvitationForm;