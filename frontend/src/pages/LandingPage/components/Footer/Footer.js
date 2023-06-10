import styled from "styled-components";
import SocialIcons from "./components/SocialIcons";

const FooterContainer = styled.div`
  padding: 10px 80px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  @media screen and (max-width: 414px) {
    padding: 0 20px;
    height: 50px;
    flex-direction: column;
    flex-flow: column-reverse;
    justify-content: center;
    align-items: space-between;
  }
`;

const CopyrightPanel = styled.div`
  font-size: 16px;
  font-weight: 400;
  @media screen and (max-width: 414px) {
    font-size: 1rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <CopyrightPanel>
        © {new Date().getFullYear()} Yabber. All rights reserved.
      </CopyrightPanel>
      <SocialIcons />
    </FooterContainer>
  );
};

export default Footer;
