import styled from "styled-components";
import SocialIcon from "./components/SocialIcon";

const SocialIconsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkedInIcon = styled.div`
  color: #0a66c2;
`;

const SocialIcons = () => {
  return (
    <SocialIconsGroup>
      <SocialIcon
        children="T"
        href="https://www.linkedin.com/in/tom-zhong-dev"
        target="_blank"
        color="#36c5f0"
      />
      <SocialIcon
        children="W"
        href="https://www.linkedin.com/in/wendy-qianwang"
        target="_blank"
        color="#e01e5a"
      />
      <SocialIcon
        children="T"
        href="https://www.linkedin.com/in/terry-gong"
        target="_blank"
        color="#2eb67d"
      />
      <SocialIcon
        children="P"
        href="https://www.linkedin.com/in/peter-sun-dev"
        target="_blank"
        color="#ecb22e"
      />

      <SocialIcon
        children="E"
        href="https://www.linkedin.com/in/eden-chen"
        target="_blank"
        color="#f78bad"
      />
      <SocialIcon
        children="N"
        href="https://www.linkedin.com/in/baodi-ning"
        target="_blank"
        color="#bb86fc"
      />
      <LinkedInIcon className="fa-brands fa-linkedin" />
    </SocialIconsGroup>
  );
};

export default SocialIcons;
