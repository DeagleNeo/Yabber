import styled from "styled-components";
import PublicChannels from "./components/PublicChannels";
import Colleagues from "./components/Colleagues";

const DiscoverContainer = styled.div`
  position: absolute;
  width: 399px;
  top: 94px;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

const Discover = ({ publicChannels, members, query }) => (
  <DiscoverContainer>
    <PublicChannels publicChannels={publicChannels} query={query} />
    <Colleagues colleagues={members} query={query} />
  </DiscoverContainer>
);

export default Discover;
