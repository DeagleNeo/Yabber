import { useContext, useEffect } from "react";
import styled from "styled-components";
import SidebarHeader from "./components/SidebarHeader";
import SidebarContent from "./components/SidebarContent";
import ClickProfileContext from "../../../../components/ClickProfile/ClickProfileContext";
import { MultiChannelContext } from "../../../../components/MultiChannel";
import { updateChannelVisitTime } from "../../../../api/api";
import ModalsContext from "../ModalsContext";
import Drawer from "@mui/material/Drawer";
import { ThemeProvider } from "@mui/material";
import theme from "../../../../theme/theme";
import breakpoints from "../../../../config/breakpoints";

const SidebarContainer = styled.div`
  min-height: 100vh;
  border-right: 1px solid #d9d9d9;
  background: #fbfbfb;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${breakpoints.ml}) {
    width: 100vw;
  }
  @media screen and (min-width: ${breakpoints.ml}) {
    width: 400px;
  }
`;

const Sidebar = ({ sidebarData }) => {
  const multiChannel = useContext(MultiChannelContext);

  useEffect(() => {
    const beforeUnload = () => {
      multiChannel.currentChannel.current._id &&
        updateChannelVisitTime(
          multiChannel.currentChannel.current._id,
          new Date()
        );
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []); // eslint-disable-line

  const { setRole, setOrgId } = useContext(ModalsContext);
  useEffect(() => {
    setRole(sidebarData.role);
    setOrgId(sidebarData.organization[0]._id);
  }, [sidebarData]);

  return (
    <SidebarContainer>
      <SidebarHeader
        organization={sidebarData.organization}
        role={sidebarData.role}
      />
      <SidebarContent />
    </SidebarContainer>
  );
};

const ResponsiveSideBar = ({ sidebarData }) => {
  const { isSideBarOpen, setIsSideBarOpen } = useContext(ClickProfileContext);
  // const onClickHandler = (e) => {
  //   setIsSideBarOpen(true);
  // };
  return (
    <ThemeProvider theme={theme}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={isSideBarOpen}
        onClose={() => {
          setIsSideBarOpen(false);
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          [theme.breakpoints.up(800)]: {
            display: "none",
          },

          // "& .MuiDrawer-paper": { boxSizing: "border-box", width: breakpoints.ml },
        }}
      >
        <Sidebar sidebarData={sidebarData} />
      </Drawer>
      <Drawer
        variant="permanent"
        anchor="left"
        open={isSideBarOpen}
        onClose={() => {
          setIsSideBarOpen(false);
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          [theme.breakpoints.down(800)]: {
            display: "none",
          },

          // "& .MuiDrawer-paper": { boxSizing: "border-box", width: breakpoints.ml },
        }}
      >
        <Sidebar sidebarData={sidebarData} />
      </Drawer>
    </ThemeProvider>
  );
};

export default ResponsiveSideBar;
