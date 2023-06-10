import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  border: 1px solid #F3F3F3;
  box-shadow: 0px 4px 4px #f5f8ff;
  border-radius: 5px;
  margin: 10px 0;
`
const SearchIcon = styled.div`
  padding: 0 10px;
  color: #680A83;
  background-color: #fff;
  align-self: center;
`
const Input = styled.input`
  width: 100%;
  min-height: 47px;
  border: none;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  outline: none;
`

const AddMemberSearchBar = ({ query, setQuery }) => {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <SearchWrapper>
      <SearchIcon className="fa-solid fa-magnifying-glass" />
      <Input
        type="text"
        placeholder="Search colleagues"
        value={query}
        onChange={handleChange}
      />
    </SearchWrapper>
  );
};

export default AddMemberSearchBar;
