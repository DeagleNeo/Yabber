import styled from "styled-components";
import { Link } from "react-router-dom";

const RightNavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 10px;
    right: 0;
    transform: translate(-100%, 60%);
    color: ${({ isScrollNavbar }) => (isScrollNavbar ? "#000" : "#fff")};
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

const NavItemsGroup = styled.div`
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

const NavLink = styled(Link)`
  color: inherit;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const RightNavbar = ({ isScrollNavbar, toggleMenuModal }) => {
  return (
    <RightNavbarContainer>
      <MenuIcon
        className="fa-solid fa-bars"
        isScrollNavbar={isScrollNavbar}
        onClick={toggleMenuModal}
      />
      <NavItemsGroup>
        <NavItem isScrollNavbar={isScrollNavbar}>
          <NavLink to="/login">Login</NavLink>
        </NavItem>
        <NavItem isScrollNavbar={isScrollNavbar}>
          <NavLink to="/signup">Sign Up</NavLink>
        </NavItem>
      </NavItemsGroup>
    </RightNavbarContainer>
  );
};

export default RightNavbar;
