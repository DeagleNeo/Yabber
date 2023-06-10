import styled from "styled-components";
import Channels from "./components/Channels";
import Dashboard from "./components/Dashboard";
import Invitations from "./components/Invitations";
import Messages from "./components/Messages";
import Users from "./components/Users";

const ContentWrapper = styled.div`
  margin-left: ${({sidebarDrawer}) => sidebarDrawer ? "80px" : "240px"};
  padding-top: 60px;
  transition: all 0.4s ease;
`;

const ContentContainer = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 1.875rem 1.875rem 0;
`;

const Content = ({ activeTab, sidebarDrawer }) => {
  return (
    <ContentWrapper sidebarDrawer={sidebarDrawer}>
      <ContentContainer>
        {
          {
            Dashboard: <Dashboard />,
            Invitations: <Invitations />,
            Users: <Users />,
            Channels: <Channels />,
            Messages: <Messages />,
          }[activeTab]
        }
      </ContentContainer>
    </ContentWrapper>
  );
};

export default Content;
