import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { animateScroll as scroll, Link as LinkScroll } from "react-scroll";
import Logo from "../../../../../../components/Logo";
import FeaturesDropdown from "./components/FeaturesDropdown";

const LeftNavbarContainer = styled.div`
  padding-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLogo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavItemsGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.button`
  padding: 0 15px;
  background: none;
  border: none;
  color: ${({ isScrollNavbar }) => (isScrollNavbar ? "#000" : "#fff")};
  cursor: pointer;
`;

const NavElement = styled.div`
  color: inherit;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const NavLink = styled(LinkScroll)`
  color: inherit;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const ShowFeaturesIcon = styled.span`
  margin-left: 2px;
`;

const NotShowFeaturesIcon = styled.span`
  margin-left: 2px;
`;

const toggleHome = () => {
  scroll.scrollToTop();
};

const LeftNavbar = ({ isScrollNavbar }) => {
  const [isShowFeatures, setIsShowFeatures] = useState(false);

  const toggleFeaturesHandler = () =>
    setIsShowFeatures((prevState) => !prevState);

  const closeFeaturesHandler = () => setIsShowFeatures(false);

  return (
    <LeftNavbarContainer>
      <NavLogo to="/" onClick={toggleHome}>
        <Logo />
      </NavLogo>
      <NavItemsGroup>
        <NavItem isScrollNavbar={isScrollNavbar}>
          <NavElement onMouseEnter={toggleFeaturesHandler}>
            Features
            {isShowFeatures ? (
              <ShowFeaturesIcon className="fa-solid fa-angle-up" />
            ) : (
              <NotShowFeaturesIcon className="fa-solid fa-angle-down" />
            )}
          </NavElement>
          {isShowFeatures && (
            <FeaturesDropdown
              toggleFeaturesHandler={toggleFeaturesHandler}
              closeFeaturesHandler={closeFeaturesHandler}
            />
          )}
        </NavItem>
        <NavItem isScrollNavbar={isScrollNavbar}>
          <NavLink
            to="technologies"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            Technologies
          </NavLink>
        </NavItem>
      </NavItemsGroup>
    </LeftNavbarContainer>
  );
};

export default LeftNavbar;
