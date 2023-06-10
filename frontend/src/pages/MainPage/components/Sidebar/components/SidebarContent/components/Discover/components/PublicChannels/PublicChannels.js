import styled from "styled-components";
import PublicChannel from "./components/PublicChannel";

const PublicChannelsTitle = styled.div`
  margin: 0 0 10px 20px;
  color: #888;
  font-size: 16px;
  font-weight: 600;
`;

const PublicChannelGroup = styled.div`
  margin-bottom: 25px;
  padding: 0px 10px 0px 20px;
  max-height: 38%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const NoResults = styled.div`
  margin: 0 0 25px 20px;
  font-weight: 900;
`;

const PublicChannels = ({ publicChannels, query }) => {
  const filteredPublicChannels = publicChannels?.filter((item) => {
    if (item.name.match(new RegExp(query, "i"))) return item;
    return null;
  });

  return (
    <>
      {publicChannels.length > 0 && (
        <>
          <PublicChannelsTitle>
            Public Channels ({publicChannels.length})
          </PublicChannelsTitle>
          {filteredPublicChannels.length === 0 ? (
            <NoResults>No results for your search</NoResults>
          ) : (
            <PublicChannelGroup>
              {filteredPublicChannels.map((publicChannel) => {
                return (
                  <PublicChannel
                    key={publicChannel._id}
                    _id={publicChannel._id}
                    avatar={publicChannel.avatar}
                    name={publicChannel.name}
                    desc={publicChannel.description}
                  />
                );
              })}
            </PublicChannelGroup>
          )}
        </>
      )}
    </>
  );
};

export default PublicChannels;
