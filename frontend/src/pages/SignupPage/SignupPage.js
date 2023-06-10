import styled from "styled-components";
import ImagePanel from "./ImagePanel";
import signup_background from "../../assets/signup_background.svg";
import AccountContent from "./AccountContent/AccountContent";

const LoginPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
`;

const SignupPage = () => {
  return (
    <LoginPageWrapper>
      <AccountContent />
      <ImagePanel src={signup_background} />
    </LoginPageWrapper>
  );
};

export default SignupPage;
