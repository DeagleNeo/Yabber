import { Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MultiChannelContext } from "../../../../../../components/MultiChannel";
import {
  getInitialLetter,
  stringToColor,
} from "../../../../../../utils/letterAvatar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClickProfileContext from "../../../../../../components/ClickProfile/ClickProfileContext";

const ChannelNameStyle = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content:space-around; */
  align-items: center;
  /* min-width: 15rem; */
  /* height:95%; */
  font-size: 1rem;
  margin: 0 0.5rem;
  box-sizing: border-box;
  /* > img {
    position: relative;
    display: inline-block;
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
  } */
`;
const NameDisplay = styled.span`
  color: #4b0973;
  font-size: 1.5rem;
  font-weight: bold;
  box-sizing: border-box;
  /* display: block; */
  padding: 0 1rem;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (min-width: 800px) and (max-width: 960px) {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 560px) {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 420px) {
    font-size: 1.1rem;
  }
`;
// const NotificationStyle = styled.div`
//   width: 20px;
//   height: 20px;
//   background: #3586ff;
//   border-radius: 50%;
//   color: #fffcfc;
//   font-size: 11px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 0.5rem;
// `;

const ChannelName = () => {
  const multiChannel = useContext(MultiChannelContext);
  const ClickProfile = useContext(ClickProfileContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <ChannelNameStyle>
      {windowWidth < 800 && (
        <IconButton
          onClick={() => {
            ClickProfile.setIsSideBarOpen(true);
          }}
          sx={{
            mr: 1,
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      {/* <IconButton
        onClick={() => {
          ClickProfile.setIsSideBarOpen(true);
        }}
        sx ={{
          if()
        }}
      >
        <ArrowBackIcon />
      </IconButton> */}

      <Avatar
        onClick={() => {
          ClickProfile.setIsDrawerOpen(true);
        }}
        alt={multiChannel.currentChannel.current.name}
        src={multiChannel.currentChannel.current.avatar}
        sx={[
          {
            bgcolor: stringToColor(multiChannel.currentChannel.current.name),
          },
          {
            width: 48,
            height: 48,

            "@media screen and (min-width: 800px) and (max-width: 960px)": {
              width: 40,
              height: 40,
            },

            "@media screen and (max-width: 560px)": {
              width: 40,
              height: 40,
            },
          },
          {
            fontSize: 26,

            "@media screen and (min-width: 800px) and (max-width: 960px)": {
              fontSize: 20,
            },

            "@media screen and (max-width: 560px)": {
              fontSize: 20,
            },
          },
        ]}
      >
        {getInitialLetter(multiChannel.currentChannel.current.name)}
      </Avatar>
      <NameDisplay> {multiChannel.currentChannel.current.name} </NameDisplay>
      {/* <NotificationStyle> {notificationNumber} </NotificationStyle> */}
    </ChannelNameStyle>
  );
};

export default ChannelName;
