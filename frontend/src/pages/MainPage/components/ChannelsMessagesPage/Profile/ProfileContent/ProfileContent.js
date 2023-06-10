import styled from "styled-components";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInformation";

const ProfileContentContainer = styled.div`
  background-color: #fafbff;
  display: flex;
  flex-direction: column;
  position: relative;
  /* padding:1rem; */
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-y: auto;
`;

const ProfileContent = () => {
  return (
    <ProfileContentContainer>
      <ProfileImage  />
      <ProfileInfo />
    </ProfileContentContainer>
  );
};

export default ProfileContent;
