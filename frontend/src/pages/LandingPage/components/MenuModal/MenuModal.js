import styled from "styled-components";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";

const MenuModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: ${({ isMenuModalOpen }) => (isMenuModalOpen ? "0" : "-100%")};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #4a154b;
  opacity: ${({ isMenuModalOpen }) => (isMenuModalOpen ? "100%" : "0")};
  transition: 0.3s ease-in-out;
  z-index: 999;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 2.2rem;
  right: 4.6rem;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  @media screen and (max-width: 414px) {
    top: 2.2rem;
    right: 2.5rem;
  }
`;

const MenuModalUpItemsGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
`;

const MenuModalItem = styled.button`
  padding: 0 15px;
  background: none;
  border: none;
  cursor: pointer;
`;

const MenuModalScroll = styled(LinkScroll)`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MenuModalDownItemsGroup = styled.div`
  margin-top: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
`;

const MenuModalLink = styled(Link)`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MenuModalBtnContainer = styled.button`
  margin: 0 10px;
  padding: 12px;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: #4a154b;

  &:hover {
    border: 2px solid #fff;
    padding: 11px;
  }
`;

const MenuModalBtnLink = styled(Link)`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
`;

const MenuModal = ({ isMenuModalOpen, toggleMenuModal }) => {
  return (
    <MenuModalContainer
      isMenuModalOpen={isMenuModalOpen}
      toggleMenuModal={toggleMenuModal}
    >
      <CloseIcon className="fa-solid fa-xmark" onClick={toggleMenuModal} />
      <MenuModalUpItemsGroup>
        <MenuModalItem>
          <MenuModalScroll
            to="features"
            onClick={toggleMenuModal}
            children="Features"
          />
        </MenuModalItem>
        <MenuModalItem>
          <MenuModalScroll
            to="technologies"
            onClick={toggleMenuModal}
            children="Technologies"
          />
        </MenuModalItem>
      </MenuModalUpItemsGroup>
      <MenuModalDownItemsGroup>
        <MenuModalItem>
          <MenuModalLink to="/login" children="Login" />
        </MenuModalItem>
        <MenuModalItem>
          <MenuModalLink to="/signup" children="Sign Up" />
        </MenuModalItem>
        <MenuModalBtnContainer>
          <MenuModalBtnLink to="/about">MEET THE TEAM</MenuModalBtnLink>
        </MenuModalBtnContainer>
      </MenuModalDownItemsGroup>
    </MenuModalContainer>
  );
};

export default MenuModal;
