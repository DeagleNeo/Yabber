import styled from "styled-components";
import SignupBody from "./SignupBody";
import breakpoints from "../../../config/breakpoints";
import StyledLogo from "../../../components/SignInSignUp/StyledLogo";

const AccountSectionWrapper = styled.div`
  box-sizing: border-box;
  width: 40%;
  height: 100vh;
  overflow-y: auto;

  @media only screen and (max-width: ${breakpoints.large}) {
    width: 50%;
  }

  @media only screen and (max-width: ${breakpoints.medium}) {
    width: 100%;
    padding: 0 15px;
  }
`;

const AccountContentWrapper = styled.div`
  box-sizing: border-box;
  max-width: 360px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 100vh;
`;

const AccountContent = () => {
  return (
    <AccountSectionWrapper>
      <AccountContentWrapper>
        <StyledLogo />
        <SignupBody />
      </AccountContentWrapper>
    </AccountSectionWrapper>
  );
};

export default AccountContent;
