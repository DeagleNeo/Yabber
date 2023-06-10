import styled from "styled-components";
import ClickProfileContext from "../../../../../../components/ClickProfile/ClickProfileContext";
import { useContext } from "react";

const ProfileHeaderContainer = styled.div`
  position: relative;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const HeaderText = styled.div`
  display: block;
  font-weight: 700;
  text-transform: uppercase;
  color: #4b0973;
  margin: 0;
`;

const ExitButton = styled.div`
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: #ee00ab;
  border-radius: 50%;
  color: white;

  :hover {
    cursor: pointer;
  }
`;
const ProfileHeader = () => {
  const ProfileClick = useContext(ClickProfileContext)

  const onClickHandler= (e) =>{
    ProfileClick.setIsDrawerOpen(false);
  }

  return (
    <ProfileHeaderContainer>
      <HeaderText>PROFILE</HeaderText>
      <ExitButton
        onClick={onClickHandler}
        className="fa-solid fa-xmark Nox"
      />
    </ProfileHeaderContainer>
  );
};
export default ProfileHeader;
