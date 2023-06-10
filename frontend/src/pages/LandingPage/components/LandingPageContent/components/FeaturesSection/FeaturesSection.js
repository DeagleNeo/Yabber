import styled from "styled-components";
import features from "../../../../../../assets/features.png";
import features_background from "../../../../../../assets/features_background.png";

const FeaturesSectionContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100vh + 100px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  background-color: #f4ede4;
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

const LeftFeaturesSection = styled.div`
  flex: 1;
  margin-left: 6rem;
  margin-bottom: 15rem;
  max-width: 450px;
  color: #000;
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
    margin-top: 0;
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

const RightFeaturesSection = styled.div`
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

const FeaturesImgGroup = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  max-width: 850px;
  max-height: 850px;
  border-radius: 0.5rem;
  @media screen and (max-width: 1200px) {
    max-height: 550px;
  }
`;

const FeaturesSectionBottom = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #0b2440;
`;

const FeaturesSection = () => {
  return (
    <>
      <FeaturesSectionContainer id={"features"} bgImg={features_background}>
        <LeftFeaturesSection>
          Yabber brings your whole team together with these features
        </LeftFeaturesSection>
        <RightFeaturesSection>
          <FeaturesImgGroup>
            <Img src={features} />
          </FeaturesImgGroup>
        </RightFeaturesSection>
        <FeaturesSectionBottom />
      </FeaturesSectionContainer>
    </>
  );
};

export default FeaturesSection;
