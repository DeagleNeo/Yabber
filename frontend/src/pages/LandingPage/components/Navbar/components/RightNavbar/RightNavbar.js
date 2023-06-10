import styled from "styled-components";
import { Link } from "react-router-dom";

const RightNavbarContainer = styled.div`
  padding-right: 20px;
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

const NavBtnContainer = styled.button`
  margin: 0 10px;
  padding: 12px;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: #4a154b;

  &:hover {
    border: 2px solid #fff;
    padding: 11px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled(Link)`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;

  @media screen and (max-width: 768px) {
    display: none;
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
        <NavBtnContainer>
          <NavBtnLink to="/about">MEET THE TEAM</NavBtnLink>
        </NavBtnContainer>
      </NavItemsGroup>
    </RightNavbarContainer>
  );
};

export default RightNavbar;
