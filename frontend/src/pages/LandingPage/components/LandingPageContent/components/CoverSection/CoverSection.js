import styled from "styled-components";
import landing_opening_big from "../../../../../../assets/landing_opening_big.png";
import landing_opening_small from "../../../../../../assets/landing_opening_small.png";
import landing_background from "../../../../../../assets/landing_background.png";

const CoverSectionContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100vh + 100px);
  background-color: #4a154b;
  background-image: url(${({ bgImg }) => bgImg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  z-index: 1;
`;

const OpeningTitleContent = styled.div`
  width: 80%;
  color: #fff;
  font-size: 3.8rem;
  font-weight: 600;
  text-align: center;
  line-height: 70px;
  @media screen and (max-width: 1200px) {
    font-size: 3.5rem;
  }
  @media screen and (max-width: 960px) {
    font-size: 3.3rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 2.8rem;
  }
  @media screen and (max-width: 414px) {
    font-size: 1.5rem;
  }
`;

const OpeningTitleSpan = styled.span`
  color: #ecb22e;
  font-style: italic;
`;

const OpeningImgPanel = styled.div`
  width: 50%;
  margin-left: auto;
  margin-right: auto;
`;

const ImgBig = styled.img`
  width: 100%;
  max-height: 600px;
  border-radius: 0.5rem;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const ImgSmall = styled.img`
display: none;
  width: 100%;
  max-height: 600px;
  border-radius: 0.5rem;
  @media screen and (max-width: 960px) {
    display: block;
  }
`;

const CoverSectionBottom = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #f4ede4;
`;

const CoverSection = () => {
  return (
    <CoverSectionContainer bgImg={landing_background}>
      <OpeningTitleContent>
        YABBER makes it <OpeningTitleSpan>downright pleasant </OpeningTitleSpan>
        to work together
      </OpeningTitleContent>
      <OpeningImgPanel>
        <ImgBig src={landing_opening_big} ></ImgBig>
        <ImgSmall src={landing_opening_small}></ImgSmall>
      </OpeningImgPanel>
      <CoverSectionBottom />
    </CoverSectionContainer>
  );
};

export default CoverSection;
