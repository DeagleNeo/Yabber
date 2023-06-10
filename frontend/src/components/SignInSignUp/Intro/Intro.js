import styled from "styled-components";

const IntroWrapper = styled.div`
  padding-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 20px;
  color: #4b0973;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Content = styled.p`
  font-size: 14px;
  font-family: poppins;
`;

const Intro = ({ title, content }) => {
  return (
    <IntroWrapper>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </IntroWrapper>
  );
};

export default Intro;
