import styled from "styled-components";
import ProfileImage from "./ChannelDetailImage";
import ProfileInfo from "./ChannelDetailInformation";

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
