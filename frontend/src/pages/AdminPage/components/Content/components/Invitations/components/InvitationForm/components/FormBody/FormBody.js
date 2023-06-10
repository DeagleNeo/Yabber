import { useState } from "react";
import styled from "styled-components";
import { inviteUser } from "../../../../../../../../../../api/api";
import FormItem from "./components/FormItem";
import SubmitBtn from "./components/SubmitBtn";

const FormBodyWrapper = styled.form`
  padding: 1rem;
`;

const FormBody = () => {
  const [email, setEmail] = useState("");
  const [serverResponse, setServerResponse] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    submitInvitation();
    setEmail("");
  };

  const submitInvitation = () => {
    inviteUser(email)
      .then(() => setServerResponse("Invitation sent successfully"))
      .catch((error) => {
        console.log(error)
        if (error.response.status === 403) {
          setServerResponse("You don't have permission")
        } else {
          setServerResponse(error.response.data.error)
        }
      });
  };

  return (
    <FormBodyWrapper onSubmit={onSubmitHandler}>
      <FormItem
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        serverResponse={serverResponse}
        setServerResponse={setServerResponse}
        required
      >
        Invitee Email
      </FormItem>
      <SubmitBtn>Invite</SubmitBtn>
    </FormBodyWrapper>
  );
};

export default FormBody;
