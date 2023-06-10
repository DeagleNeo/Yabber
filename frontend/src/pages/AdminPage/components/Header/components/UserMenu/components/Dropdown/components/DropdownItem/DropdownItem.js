import styled from "styled-components"

const DropdownItemWrapper = styled.a`
  display: flex;
  align-items: center;
  border-top: 1px solid #e3e3e3;
  padding: 10px 15px;
  clear: both;
  font-size: 0.8rem;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  text-decoration: none;
  transition: all 0.4s ease;

  :hover {
    background-color: #f4eef6;
  }
`;

const DropdownItem = ({value}) => {
  return (
    <DropdownItemWrapper href="/admin">
      {value}
    </DropdownItemWrapper>
  )
}

export default DropdownItem;