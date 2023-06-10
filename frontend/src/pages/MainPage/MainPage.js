import styled from "styled-components";
import { useEffect, useState } from "react";
import ResponsiveSidebar from "./components/Sidebar/Sidebar";
import ChannelMessagesPage from "./components/ChannelsMessagesPage";
import Loading from "../../components/Loading";
import { userConnection } from "../../api/api";
import MultiChannel from "../../components/MultiChannel";
import ClickProfile from "../../components/ClickProfile";
import { ModalsContextProvider } from "./components/ModalsContext";
import CreateChatModal from "./components/CreateChatModal";
import CreateGroupModal from "./components/CreateGroupModal";
import AddMemberModal from "./components/AddMemberModal";
import { SocketContextProvider } from "./components/SocketIoContext";
import JoinGroupModal from "./components/JoinGroupModal/JoinGroupModal";
import ReactionListDialog from "./components/ReactionListDialog";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const MainPage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userConnection().then(async ({ data }) => {
      setData(await data.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ModalsContextProvider>
      <MultiChannel>
        <ClickProfile>
          <Wrapper>
            <SocketContextProvider>
              <ResponsiveSidebar sidebarData={data} />
              <ChannelMessagesPage />
              <CreateChatModal />
              <CreateGroupModal />
              <JoinGroupModal />
              <AddMemberModal />
              <ReactionListDialog />
            </SocketContextProvider>
          </Wrapper>
        </ClickProfile>
      </MultiChannel>
    </ModalsContextProvider>
  );
};

export default MainPage;
