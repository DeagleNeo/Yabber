import { useContext, useState } from "react";
import styled from "styled-components";
import Content from "./components/Content";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Loading from "../../components/Loading";
import { AuthenticationContext } from "../../components/Authentication";
import { Navigate } from "react-router-dom";

import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";

import {SnackbarProvider} from "notistack"


const AdminPageWrapper = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 100vw;
  min-height: 100vh;

  *,
  ::before,
  ::after {
    box-sizing: border-box;
    line-height: 1.5;
  }
`;


const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarDrawer, setSidebarDrawer] = useState(false);

  const authentication = useContext(AuthenticationContext);
  const breakpoint_807 = useMediaQuery("(max-width: 807px)");

  useEffect(() => {
    if(breakpoint_807){
      setSidebarDrawer(true)
    } else {
      setSidebarDrawer(false)
    }
  }, [breakpoint_807])

  if (authentication.loading) {
    return <Loading />;
  }

  if (!authentication.authenticated) {
    return <Navigate to="/login"></Navigate>;
  }

  return (
    <SnackbarProvider maxSnack={1} variant="info" autoHideDuration={3000}>
      <AdminPageWrapper className="adminPage">
        <Header
          sidebarDrawer={sidebarDrawer}
          setSidebarDrawer={setSidebarDrawer}
        />
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarDrawer={sidebarDrawer}
        />
        <Content activeTab={activeTab} sidebarDrawer={sidebarDrawer} />
      </AdminPageWrapper>
    </SnackbarProvider>
  );
};

export default AdminPage;
