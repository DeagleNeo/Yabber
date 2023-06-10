import styled from "styled-components";
import * as React from "react";
import { Drawer } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import ChannelAndSearch from "./ChannelAndSearch/ChannelSearch";
import ChatContents from "./ChatContents/ChatContents";
import InputBox from "./InputBox/InputBox";
import Profile from "./Profile/Profile";
import ChannelDetail from "./ChannelDetail";
import ClickProfileContext from "../../../../components/ClickProfile/ClickProfileContext";
import { SocketContext } from "../SocketIoContext";
import breakpoints from "../../../../config/breakpoints";


const Wrapper = styled.div`
  display: flex;
`;

const ChannelMessageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;

  flex: 1;
  box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.2);
  @media screen and (max-width:${breakpoints.ml}) {
    width: 100vw;
  }
  @media screen and (min-width:${breakpoints.ml}) {
    margin-left: 400px;
    /* width: calc(100vw - ${(props) => props.drawerWidth}px); */
    width: calc(100vw - 400px - ${(props) => props.drawerWidth}px);
  }
`;

const ChannelMessage = () => {
  const ClickProfile = useContext(ClickProfileContext);

  const { socket, currentUser } = useContext(SocketContext);
  const [drawerWidth, setDrawerWidth] = useState(0);

  useEffect(() => {
    if (ClickProfile.isDrawerOpen === true) {
      setDrawerWidth(250);
    } else {
      setDrawerWidth(0);
    }
  }, [ClickProfile.isDrawerOpen]);

  return (
    <Wrapper>
      <ChannelMessageStyle drawerWidth={drawerWidth}>
        <ChannelAndSearch />
        <ChatContents socket={socket} currentUser={currentUser} />
        <InputBox socket={socket} currentUser={currentUser} />
      </ChannelMessageStyle>
      <Drawer
        variant="persistent"
        anchor="right"
        open={ClickProfile.isDrawerOpen}
        onClose={() => ClickProfile.setIsDrawerOpen(false)}
      >
        {ClickProfile.tab === "CHAT" && (
          <Profile drawerWidth={drawerWidth} currentUser={currentUser} />
        )}
        {ClickProfile.tab === "GROUP" && (
          <ChannelDetail drawerWidth={drawerWidth} currentUser={currentUser} />
        )}
      </Drawer>
    </Wrapper>
  );
};

export default ChannelMessage;
