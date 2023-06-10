import styled from "styled-components";

const SearchbarContainer = styled.div`
  display: flex;
  border: 1px solid #d9d5d5;
  border-radius: 6px;
`;

const SearchButton = styled.button`
  padding: 0 10px;
  color: #680a83;
  background-color: #fff;
  border: none;
  border-radius: 6px;
  outline: none;
`;

const SearchInput = styled.input`
  width: 100%;
  min-height: 40px;
  border: none;
  border-radius: 6px;
  &:focus,
  &:active {
    outline: none;
  }
`;

const Searchbar = ({ query, setQuery }) => {
  const searchHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <SearchbarContainer>
      <SearchButton className="fas fa-search" />
      <SearchInput
        type="text"
        placeholder="Search..."
        value={query}
        onChange={searchHandler}
      />
    </SearchbarContainer>
  );
};

export default Searchbar;
