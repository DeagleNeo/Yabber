import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Searchbar from "./components/Searchbar";
import Channels from "./components/Channels";
import DirectMessages from "./components/DirectMessages";
import Discover from "./components/Discover/Discover";
import Loading from "../../../../../../components/Loading";
import { userChannels } from "../../../../../../api/api";
import { MultiChannelContext } from "../../../../../../components/MultiChannel";
import { SocketContext } from "../../../SocketIoContext";
import ModalsContext from "../../../ModalsContext";

const SidebarContentContainer = styled.div`
  position: relative;
  height: 100%;
  background: #fbfbfb;
`;

const ContentBackground = styled.div`
  height: 100%;
  background: #5a078b;
`;

const ContentPanel = styled.div`
  height: 100%;
  background: #fbfbfb;
  border-top-left-radius: 50px;
`;

const ContentSearch = styled.div`
  padding: 25px 20px;
`;

const ContentContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 89px;
  bottom: 0;
  padding: 0 10px 89px 20px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const SidebarContent = () => {
  const [dms, setDms] = useState([]);
  const [channels, setChannels] = useState([]);
  const [publicChannels, setPublicChannels] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [query, setQuery] = useState("");

  const { activeTab } = useContext(ModalsContext);
  const multiChannel = useContext(MultiChannelContext);
  const { reloadGroup, reloadChat, setReloadGroup, setReloadChat } =
    useContext(SocketContext);
  // const ClickProfile = useContext(ClickProfileContext)
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    if (reloadGroup && activeTab === "GROUP") {
      setReloadCount((count) => count + 1);
    }
    if (reloadChat && activeTab === "CHAT")
      setReloadCount((count) => count + 1);
  }, [activeTab, reloadGroup, reloadChat]);
  if (reloadCount > 10000000) setReloadCount(0);

  const type =
    activeTab === "CHAT"
      ? "dms/summary"
      : activeTab === "GROUP"
      ? "channels/summary"
      : activeTab === "DISCOVER"
      ? "discover"
      : null;

  useEffect(() => {
    switch (activeTab) {
      case "CHAT":
        userChannels(type)
          .then(async ({ data }) => {
            setDms(data.data);
            setLoading(false);
          })
          .finally(() => setReloadChat(false));
        break;
      case "GROUP":
        userChannels(type)
          .then(async ({ data }) => {
            setChannels(data.data);
            setLoading(false);
          })
          .finally(() => setReloadGroup(false));

        break;
      case "DISCOVER":
        userChannels(type).then(async ({ data }) => {
          setPublicChannels(data.data.publicChannels);
          setMembers(data.data.members);
          setLoading(false);
        });
        break;
      default:
        break;
    }
  }, [type, activeTab, reloadCount,setReloadChat,setReloadGroup]);

  useEffect(() => {
    const updateData = (prev) => {
      const data = [];
      prev &&
        prev.forEach((item) => {
          data.push(JSON.parse(JSON.stringify(item)));
        });
      if (multiChannel.lastMessage && data && data.length > 0) {
        let index = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i]._id === multiChannel.lastMessage.channelId) {
            data[i].lastMessage = {
              msgType: multiChannel.lastMessage.msgType,
              content: multiChannel.lastMessage.content,
              time: multiChannel.lastMessage.time,
            };
            data[i]._id === multiChannel.currentChannel.current._id
              ? (data[i].notification = 0)
              : (data[i].notification += 1);
            index = i;
            break;
          }
        }
        if (index) {
          data.unshift(data.splice(index, 1)[0]);
        }
      }
      return data;
    };

    switch (activeTab) {
      case "CHAT":
        setDms((prev) => updateData(prev));
        break;
      case "GROUP":
        setChannels((prev) => updateData(prev));
        break;
      default:
        break;
    }

    setRefresh(true);
  }, [multiChannel.lastMessage]); // eslint-disable-line

  useEffect(() => {
    const updateNotificationToZero = (prev) => {
      const data = [];
      prev &&
        prev.forEach((item) => {
          data.push(JSON.parse(JSON.stringify(item)));
        });
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i]._id === multiChannel.currentChannel.current._id) {
            data[i].notification = 0;
            break;
          }
        }
      }
      return data;
    };

    switch (activeTab) {
      case "CHAT":
        setDms((prev) => updateNotificationToZero(prev));
        break;
      case "GROUP":
        setChannels((prev) => updateNotificationToZero(prev));
        break;
      default:
        break;
    }
  }, [multiChannel.initChannel]); // eslint-disable-line

  useEffect(() => {
    refresh && setRefresh(false);
  }, [refresh]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SidebarContentContainer>
      <ContentBackground>
        <ContentPanel>
          <ContentSearch>
            <Searchbar query={query} setQuery={setQuery} />
          </ContentSearch>
          <ContentContainer>
            {activeTab === "CHAT" && <DirectMessages dms={dms} query={query} />}
            {activeTab === "GROUP" && (
              <Channels channels={channels} query={query} />
            )}
          </ContentContainer>
          {activeTab === "DISCOVER" && (
            <Discover
              publicChannels={publicChannels}
              members={members}
              query={query}
            />
          )}
        </ContentPanel>
      </ContentBackground>
    </SidebarContentContainer>
  );
};

export default SidebarContent;
