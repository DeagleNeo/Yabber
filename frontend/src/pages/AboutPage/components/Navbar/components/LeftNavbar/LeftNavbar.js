import styled from "styled-components";
import { Link } from "react-router-dom";
import { animateScroll as scroll} from "react-scroll";
import Logo from "../../../../../../components/Logo";

const LeftNavbarContainer = styled.div`
  padding-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLogo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const toggleHome = () => {
  scroll.scrollToTop();
};

const LeftNavbar = () => {
  return (
    <LeftNavbarContainer>
      <NavLogo to="/" onClick={toggleHome}>
        <Logo />
      </NavLogo>
    </LeftNavbarContainer>
  );
};

export default LeftNavbar;
