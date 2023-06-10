import styled from "styled-components";
import { Avatar } from "@mui/material";
import {
  getInitialLetter,
  stringToColor,
} from "../../../../../../../utils/letterAvatar";
import { useContext } from "react";
import ClickProfileContext from "../../../../../../../components/ClickProfile/ClickProfileContext";

const ImageContainer = styled.div`
  /* background-color: #FAFBFF; */
  padding: 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  /* > img {s
    border-radius: 50%;
    width: 90px;
    height: 90px;
  } */
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

const ChannelDetailImage = () => {
  const ClickProfile = useContext(ClickProfileContext);
  const { name, avatar } = ClickProfile.channelInfo;

  return (
    <ImageContainer>
      <Avatar
        alt={name}
        src={avatar}
        sx={{ bgcolor: stringToColor(name), width: 60, height: 60 }}
      >
        {getInitialLetter(name)}
      </Avatar>
      <ProfileName>{name}</ProfileName>
    </ImageContainer>
  );
};
export default ChannelDetailImage;
