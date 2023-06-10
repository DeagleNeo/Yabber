import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ClockWithTimeZone from "./ClockWithTimeZone";
import { useContext } from "react";
import ClickProfileContext from "../../../../../../../components/ClickProfile/ClickProfileContext";
import breakpoints from "../../../../../../../config/breakpoints";
import timezonex from "../../../../../../../assets/timezone.json"

const ProfileInfoContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 1rem;
  display: block;
  flex-direction: column;
  background-color: white;
  align-items: center;
  width: 100%;
  overflow: auto;

`;
const theme = createTheme({
  typography: {
    profileInfoList: {
      fontSize: 15,
      fontWeight: 800,
      color: "black",
    },
  },
});
const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  @media screen and (max-width: ${breakpoints.ml}) {
    text-align: center;
    margin-top: 20px;
  }
  @media screen and (min-width: ${breakpoints.ml}) {
    text-align: left;
  }
`;
const PersonalInfoValue = styled.span`
  color: #939393;
  margin: 0 0 15px;
  @media screen and (max-width: ${breakpoints.ml}) {
    padding: 10px 0px ;
  }
  
`;

const timez = new Date().getTimezoneOffset()/(-60) + ''

const localTimeZoneIndex = timezonex.findIndex(ele => ele.value === timez)

const ProfileInfo = () => {
  const ClickProfile = useContext(ClickProfileContext);
  const { department, jobTitle, email, country, city, timezone } =
    ClickProfile.userInfo;
  const localtime = timezone
    ? ClockWithTimeZone(timezonex[timezone].value)
    : ClockWithTimeZone(timezonex[localTimeZoneIndex].value);
  return (
    <ThemeProvider theme={theme}>
      <ProfileInfoContainer>
        <PersonalInfo>
          <Typography variant="profileInfoList">Department </Typography>
          <PersonalInfoValue>{department}</PersonalInfoValue>

          <Typography variant="profileInfoList">Position</Typography>
          <PersonalInfoValue>{jobTitle?jobTitle:" "}</PersonalInfoValue>

          <Typography variant="profileInfoList">Email</Typography>
          <PersonalInfoValue>{email}</PersonalInfoValue>

          <Typography variant="profileInfoList">Country</Typography>
          <PersonalInfoValue>{country}</PersonalInfoValue>

          <Typography variant="profileInfoList">City</Typography>
          <PersonalInfoValue>{city}</PersonalInfoValue>

          <Typography variant="profileInfoList">Local Time</Typography>
          <PersonalInfoValue>{localtime}</PersonalInfoValue>
        </PersonalInfo>
      </ProfileInfoContainer>
    </ThemeProvider>
  );
};
export default ProfileInfo;
