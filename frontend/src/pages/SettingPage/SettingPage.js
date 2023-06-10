import styled from "styled-components";
import AccountSetting from "./components/AccountSetting";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../components/Authentication";
import Loading from "../../components/Loading";
import { Navigate } from "react-router-dom";
import SettingProfile from "./components/SettingProfile/SettingProfile";
import { useMediaQuery } from "@mui/material";
import theme from "../../theme/theme";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const SettingsWrapper = styled.div`
  height: 100%;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
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
  padding-left: 1.2rem;
  margin-top: 10px;
  cursor: pointer;

  :hover{
    color: #757575;
  }
`

const SettingPage = () => {
  const showProfileOnly = useMediaQuery('(min-width:769px)')
  const downProfileOnly = useMediaQuery(theme.breakpoints.down('medium'))
  const currentUser = JSON.parse(
    sessionStorage.getItem("currentUser") || localStorage.getItem("currentUser")
  );
  const [userInfo, setUserInfo] = useState(currentUser);
  const navigate = useNavigate();
  const mainPageHandler = () => {
    navigate("/main");
  };
  const authentication = useContext(AuthenticationContext);

  if (authentication.loading) {
    return <Loading />;
  }

  if (!authentication.authenticated) {
    return <Navigate to="/login"></Navigate>;
  }

  return (

    <>
      {downProfileOnly ?
        <Button onClick={mainPageHandler}>
          <ArrowBackIosNewIcon sx={{ color: '#939393', width: '12px' }} />
          Back to Chat
        </Button> : null}

      <SettingsWrapper>
        <SettingProfile
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          currentUser={currentUser}
        />
        {showProfileOnly ?
          <AccountSetting
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            currentUser={currentUser}
          /> : null}
      </SettingsWrapper>
    </>
  )
}

export default SettingPage;
