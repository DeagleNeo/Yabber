import styled from "styled-components";
import ImagePanel from "./ImagePanel";
import login_background from "../../assets/login_background.svg";
import AccountContent from "./AccountContent/AccountContent";

const LoginPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
`;

const LoginPage = () => {
  return (
    <LoginPageWrapper>
      <AccountContent />
      <ImagePanel src={login_background} />
    </LoginPageWrapper>
  );
};

export default LoginPage;
