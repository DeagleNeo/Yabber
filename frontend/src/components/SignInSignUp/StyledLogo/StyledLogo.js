import Logo from "../../Logo";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoWrapper = styled.div`
  top: 30px;
  padding-bottom: 60px;
`;

const HomeLogo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = ({ width }) => {
  return (
    <LogoWrapper>
      <HomeLogo to="/">
        <Logo width={width}></Logo>
      </HomeLogo>
    </LogoWrapper>
  );
};
export default StyledLogo;
