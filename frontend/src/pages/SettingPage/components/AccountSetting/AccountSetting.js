import { useMediaQuery } from "@mui/material"
import { useState } from "react"
import styled from "styled-components"
import theme from "../../../../theme/theme"
import SettingProfile from "../SettingProfile/SettingProfile"
import MainSettingContent from "./MainSettingContent"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const Wrapper = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (min-width: 769px) {
    width: 70%;
  }
  display: flex;
  flex-direction: column;
  padding-top: 6px;
`

const Container = styled.div`
  margin-right: 10px;
`
const Link = styled.a`
  text-decoration: none;
  color: #5A078B;
  font-weight: 600;
  font-size: 13px;
`
const Title = styled.div`
  width: 100%;
  padding: 12px 15px;
  box-shadow: 0px 4px 4px #f5f8ff;
  border-radius: 5px;
  background: #FFFFFF;
  border: 1px solid #F4EEFF;
  display: flex;
  align-items: center;
  gap: 10px;
`

const H5 = styled.h5`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
  color: #420BA1;
  margin-bottom: 0.25rem;
  margin-top: 0;
  text-transform: uppercase;
`

const P = styled.p`
  color: #212529;
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 0;
`

const AccountSetting = ({
  userInfo,
  setUserInfo,
  currentUser,
  // showSection,
  // setShowSection
}) => {
  const [showSection, setShowSection] = useState('SETTINGSECTION');
  const showOnChange = useMediaQuery(theme.breakpoints.down('medium'))

  return (
    <>
      {showSection === 'SETTINGSECTION' &&
        <Wrapper>
          <Container>
            <Title>
              {showOnChange ?
                <Link href='Profile_Section' active={showSection === 'PROFILESECTION'} onClick={(event) => {
                  event.preventDefault();
                  setShowSection('PROFILESECTION')
                }}><ArrowBackIosNewIcon sx={{ color: '#939393', width: '16px' }} /></Link> : null}
              <div>
                <H5>SETTINGS</H5>
                <P>Manage your account details and invitations</P></div>
            </Title>
            <MainSettingContent
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              currentUser={currentUser}
            />
          </Container>
        </Wrapper>}
      {showSection === 'PROFILESECTION' && <SettingProfile
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        currentUser={currentUser} />
      }
    </>
  )
}

export default AccountSetting