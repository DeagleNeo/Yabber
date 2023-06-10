import { useState } from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import MenuModal from "./components/MenuModal";
import LandingPageContent from "./components/LandingPageContent";
import Footer from "./components/Footer";

const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const LandingPage = () => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const toggleMenuModal = () => {
    setIsMenuModalOpen((prevState) => !prevState);
  };

  return (
    <LandingPageWrapper>
      <MenuModal
        isMenuModalOpen={isMenuModalOpen}
        toggleMenuModal={toggleMenuModal}
      />
      <Navbar
        toggleMenuModal={toggleMenuModal}
      />
      <LandingPageContent />
      <Footer />
    </LandingPageWrapper>
  );
};

export default LandingPage;
