import styled from "styled-components";
import { Avatar } from "@mui/material";
import ClockWithTimeZone from "../../../../MainPage/components/ChannelsMessagesPage/Profile/ProfileContent/ProfileInformation/ClockWithTimeZone";
import { getInitialLetter, stringToColor } from "../../../../../utils/letterAvatar";
import timezonex from "../../../../../assets/timezone.json";

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  overflow: auto;
  @media (max-width: 850px) and (min-width: 769px) {
    padding: 0;
  }
`

const ProfileName = styled.div`
  color: #5a078b;
  font-size: 20px;
  font-weight: 600;
  margin: 12px 0;
`;

const PersonalInfo = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  background: #FAFBFF;
  padding: 15px 30px;
  width: 100%;
  @media (max-width: 850px) and (min-width: 769px) {
    padding: 15px 0;
  }
  @media (max-width: 350px) {
    padding: 15px 0;
  }
`;

const PersonInfoTitle = styled.div`
  color: #5a078b;
  font-size: 14px;
  font-weight: 600;
`

const PersonalInfoValue = styled.span`
  color: #939393;
  margin: 5px 0 18px 0;
  font-size: 14px;
  font-weight: 500;
  padding: 0 20px;

  @media (max-width: 1200px) {
    padding: 0;
  }

  &:last-child {
    margin-bottom: 0;
    }
`;

const timez = new Date().getTimezoneOffset()/(-60) + ''

const localTimeZoneIndex = timezonex.findIndex(ele => ele.value === timez)

const ProfileCard = ({
  userInfo,
  setUserInfo,
  currentUser,
}) => {
  const localTime = userInfo.timezone? ClockWithTimeZone(timezonex[userInfo.timezone].value) : ClockWithTimeZone(timezonex[localTimeZoneIndex].value);

  return (
    <Profile>
      <Avatar
        alt={userInfo.firstName}
        src={userInfo.avatar}
        sx={{ bgcolor: stringToColor(userInfo.firstName), width: 80, height: 80 }}
      >
        {getInitialLetter(userInfo.firstName)}
      </Avatar>
      <ProfileName>
        {userInfo.firstName} {userInfo.lastName}
      </ProfileName>
      <PersonalInfo>
        <PersonInfoTitle>Department </PersonInfoTitle>
        <PersonalInfoValue>{userInfo.department}</PersonalInfoValue>

        <PersonInfoTitle>Position</PersonInfoTitle>
        <PersonalInfoValue>{userInfo.jobTitle}</PersonalInfoValue>

        <PersonInfoTitle>Email</PersonInfoTitle>
        <PersonalInfoValue>{userInfo.email}</PersonalInfoValue>

        <PersonInfoTitle>Country</PersonInfoTitle>
        <PersonalInfoValue>{userInfo.country}</PersonalInfoValue>

        <PersonInfoTitle>City</PersonInfoTitle>
        <PersonalInfoValue>{userInfo.city}</PersonalInfoValue>

        <PersonInfoTitle>Local Time</PersonInfoTitle>
        <PersonalInfoValue>{localTime}</PersonalInfoValue>
      </PersonalInfo>
    </Profile>
  )
}

export default ProfileCard;