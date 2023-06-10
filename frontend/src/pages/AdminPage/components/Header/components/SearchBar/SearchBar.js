import styled from "styled-components";

const SearchBarWrapper = styled.div`
  margin: 10px;
`;

const SearchForm = styled.form`
  position: relative;
`;

const SearchInput = styled.input`
  background-color: rgb(104 10 131 / 6%);
  border-radius: 15px;
  color: #000;
  border: none;
  height: 40px;
  padding: 10px 15px 10px 40px;
  font-size: 0.9rem;
  outline: none;
`

const SearchBtn = styled.button`
  background-color: transparent;
  border-color: transparent;
  color: #680a83;
  min-height: 40px;
  padding: 7px 15px;
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  outline: none;
`;

const SearchBar = () => {
  return (
    <SearchBarWrapper>
      <SearchForm>
        <SearchInput placeholder="Search here..." />
        <SearchBtn><i className="gg-search"></i></SearchBtn>
      </SearchForm>
    </SearchBarWrapper>
  )
}

export default SearchBar;