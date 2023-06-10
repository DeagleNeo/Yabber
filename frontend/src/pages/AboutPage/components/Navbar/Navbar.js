import styled from "styled-components";
import LeftNavbar from "./components/LeftNavbar";
import RightNavbar from "./components/RightNavbar";
import { useState, useEffect } from "react";

const NavContainer = styled.nav`
  position: fixed;
  top: 10px;
  width: 90%;
  height: 80px;
  margin: 0 5%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 99px;
  background-color: ${({ isScrollNavbar }) =>
    isScrollNavbar ? "rgba(255,255,255,0.7)" : "transparent"};
  z-index: 10;
  transition: 0.8s all ease;
  @media screen and (max-width: 960px) {
    margin: 0 5%;
    transition: 0.8s all ease;
  }
  @media screen and (max-width: 768px) {
    margin: 0 5%;
    transition: 0.8s all ease;
  }
`;

const Navbar = ({ toggleMenuModal }) => {
  const [isScrollNavbar, setIsScrollNavbar] = useState(false);

  const handleScroll = () => {
    window.scrollY > 0 ? setIsScrollNavbar(true) : setIsScrollNavbar(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavContainer isScrollNavbar={isScrollNavbar}>
      <LeftNavbar isScrollNavbar={isScrollNavbar} />
      <RightNavbar
        isScrollNavbar={isScrollNavbar}
        toggleMenuModal={toggleMenuModal}
      />
    </NavContainer>
  );
};

export default Navbar;
