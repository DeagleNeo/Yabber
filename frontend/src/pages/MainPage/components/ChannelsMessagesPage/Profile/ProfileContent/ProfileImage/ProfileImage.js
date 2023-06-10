import styled from "styled-components";
import { Avatar } from "@mui/material";
import {
  getInitialLetter,
  stringToColor,
} from "../../../../../../../utils/letterAvatar";
import { useContext } from "react";
import ClickProfileContext from "../../../../../../../components/ClickProfile/ClickProfileContext";
import { SocketContext } from "../../../../../components/SocketIoContext";
import breakpoints from "../../../../../../../config/breakpoints";
import theme from "../../../../../../../theme";

const ImageContainer = styled.div`
  /* background-color: #FAFBFF; */
  padding: 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;


  
`;

const ProfileName = styled.div`
  font-weight: 600;
  color: #4b0973;
  font-size: 18px;
  margin-bottom: 0;
  margin-block-start: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;
const UserStatus = styled.div`
  display:  flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  > span{
    content: "";
    position: relative;
    right: 2px;
    background-color: ${(props) => props.statusColor};
    width: 8px;
    height: 8px;
    border-radius: 50px;
    /* @media screen and (max-width: ${breakpoints.ml}) {
      left: 42.5%;
    } */
    /* @media screen and (min-width: ${breakpoints.ml}) {
      left: 33%;
    } */
  }
`;

 const StatusText = styled.div`
 
 
 
 `


const ProfileImage = () => {
  const ClickProfile = useContext(ClickProfileContext);
  const { firstName, lastName, avatar, _id } = ClickProfile.userInfo;
  const { onlineUsers } = useContext(SocketContext);

  const status = onlineUsers.some((userId) => userId === _id.toString());
  const statusColor = status === true ? "#49E073" : "#aaaaaa";
  const statusText = status === true ? "online" : "offline";

  return (
    <ImageContainer>
      {/* <img src={avatar} alt="personal" /> */}
      <Avatar
        alt={firstName}
        src={avatar}
        sx={{ bgcolor: stringToColor(firstName), 
          [theme.breakpoints.down(800)]:{
            width: 70, height: 70
          },
          
          width: 60, height: 60 }}
      >
        {getInitialLetter(firstName + " " + lastName)}
      </Avatar>
      <ProfileName>
        {firstName} {lastName}
      </ProfileName>
      <UserStatus statusColor={statusColor}>
        <span></span>
        <StatusText>{statusText}</StatusText>
      </UserStatus>
    </ImageContainer>
  );
};
export default ProfileImage;
