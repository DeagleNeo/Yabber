import styled from "styled-components";
import TechIcons from "../../InfoSection/components/TechIcons/TechIcons";
import technologies_background from "../../../../../../../assets/technologies_background.png";

const TechnologiesSectionContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100vh + 100px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  background-color: #0b2440;
  background-image: url(${({ bgImg }) => bgImg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  z-index: 1;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
  }
  @media screen and (max-width: 960px) {
    gap: 1rem;
  }
  @media screen and (max-width: 768px) {
    gap: 3rem;
  }
`;

const LeftTechnologiesSection = styled.div`
  flex: 1;
  margin-left: 6rem;
  margin-bottom: 15rem;
  max-width: 450px;
  color: #fff;
  font-size: 3.2rem;
  font-weight: 900;
  @media screen and (max-width: 1200px) {
    flex: 0;
    margin: -9rem 0 0 0;
    max-width: 80%;
    font-size: 3rem;
    text-align: center;
  }
  @media screen and (max-width: 960px) {
    font-size: 2.6rem;
  }
  @media screen and (max-width: 768px) {
    margin-top: -3rem;
    font-size: 2.4rem;
  }
  @media screen and (max-width: 540px) {
    font-size: 1.8rem;
  }
  @media screen and (max-width: 414px) {
    margin-top: -6rem;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 375px) {
    margin-top: 0;
  }
`;

const RightTechnologiesSection = styled.div`
  flex: 2;
  margin-right: 6rem;
  margin-bottom: 10rem;
  max-width: 850px;

  @media screen and (max-width: 1200px) {
    flex: 0;
    margin: 0;
    max-width: 90%;
  }
`;

const TechnologiesSection = () => {
  return (
    <TechnologiesSectionContainer
      id={"technologies"}
      bgImg={technologies_background}
    >
      <LeftTechnologiesSection>
        Yabber is built with these technologies
      </LeftTechnologiesSection>
      <RightTechnologiesSection>
        <TechIcons />
      </RightTechnologiesSection>
    </TechnologiesSectionContainer>
  );
};

export default TechnologiesSection;
