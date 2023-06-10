import styled from "styled-components";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccountSetting from "../AccountSetting";
import { useState } from "react";
import theme from "../../../../theme/theme";
import ProfileCard from "./components/ProfileCard";


const Container = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (min-width: 769px) {
    min-width: 30%;
  }
  box-sizing: border-box;
  padding: 1rem;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  text-align: left;
  overflow-x: hidden;

  > ul {
    list-style: none;
  }
`;
const Button = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  align-self: flex-start;
  color: #939393;
  font-size: 12px;
  font-weight: 500;
  margin: 5px 0;
  cursor: pointer;

  :hover{
    color: #757575;
  }
`

const Link = styled.a`
  text-decoration: none;
  color: #5A078B;
  font-weight: 600;
  font-size: 13px;
  display: flex;
  width: fit-content;
  margin-left: auto;
  margin-right: 0;
`
const ProfileWrapper = styled.div`
  width: 100%;
  margin: 0 25px;
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #F3F3F3;
  box-shadow: 0px 4px 4px #f5f8ff;
  overflow: auto;
`
const Header = styled.h4`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: #4B0973;
  margin: auto;
`

const SettingProfile = ({
  userInfo,
  setUserInfo,
  currentUser,
}) => {
  const [showSection, setShowSection] = useState('PROFILESECTION');
  const upMediumScreen = useMediaQuery(theme.breakpoints.up('medium'))

  const navigate = useNavigate();
  const mainPageHandler = () => {
    navigate("/main");
  };

  return (
    <>
      {upMediumScreen ?
        <Container>
          <Button onClick={mainPageHandler}>
            <ArrowBackIosNewIcon sx={{ color: '#939393', width: '12px' }} />
            Back to Chat
          </Button>
          <ProfileWrapper>
            <Header>PROFILE</Header>
            <ProfileCard userInfo={userInfo} setUserInfo={setUserInfo} currentUser={currentUser} />
          </ProfileWrapper>
        </Container> :
        <>
          {showSection === 'PROFILESECTION' &&
            <Container>
              <ProfileWrapper>
                <Header>PROFILE</Header>
                <Link href='Setting_Section' active={showSection === 'SETTINGSECTION'} onClick={(event) => {
                  event.preventDefault();
                  setShowSection('SETTINGSECTION')
                }}>Edit Settings</Link>
                <ProfileCard userInfo={userInfo} setUserInfo={setUserInfo} currentUser={currentUser} />
              </ProfileWrapper>
            </Container>}
          {showSection === 'SETTINGSECTION' &&
            <AccountSetting
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              currentUser={currentUser} />
          }
        </>
      }
    </>
  )
}

export default SettingProfile;