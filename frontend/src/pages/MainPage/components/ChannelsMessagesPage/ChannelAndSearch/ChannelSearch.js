import styled from "styled-components";
import SearchBar from "./SearchBar";
import ChannelName from "./NameDisplay";

const ChannelAndSearchStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  align-items: center;
  box-shadow: 0px 4px 4px #f5f8ff;
  border-radius: 5px;
  background: #ffffff;
  border: 1px solid #f4eeff;
  margin: 0.5rem;
  width: 95%;
  height: 70px;
`;

const ChannelAndSearch = () => {
  return (
    <ChannelAndSearchStyle>
      <ChannelName />
      <SearchBar />
    </ChannelAndSearchStyle>
  );
};

export default ChannelAndSearch;
