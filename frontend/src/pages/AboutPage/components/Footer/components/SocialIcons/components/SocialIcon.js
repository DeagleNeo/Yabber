import styled from "styled-components";

const SocialIconLink = styled.a`
  margin-right: 25px;
  text-decoration: none;
  color: inherit;
  font-size: 24px;
  font-weight: 900;
  color: ${({ color }) => color};
`;

const SocialIcon = ({ children, href, target, color }) => {
  return (
    <SocialIconLink href={href} target={target} color={color}>
      {children}
    </SocialIconLink>
  );
};

export default SocialIcon;
