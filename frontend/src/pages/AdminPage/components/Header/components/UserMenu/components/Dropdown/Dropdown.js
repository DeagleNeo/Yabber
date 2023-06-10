import styled from "styled-components";
import DropdownItem from "./components/DropdownItem";
import UserHeader from "./components/UserHeader";

const DropdownWrapper = styled.div`
  position: absolute;
  inset: 0px 0px auto auto;
  margin: 0px;
  min-width: 200px;
  padding: 0;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  transform-origin: left top 0;
  transform: translate3d(0px, 62px, 0px);
  box-shadow: inherit;
  background-color: #fff;
  color: #212529;
  text-align: left;
  list-style: none;
  background-clip: padding-box;
  display: ${({show}) => show ? "block" : "none"};
`;

const ITEMS = [
  {value: "My Profile"},
  {value: "Account Settings"},
  {value: "Logout"},
]

const Dropdown = ({show}) => {
  return (
    <DropdownWrapper show={show}>
      <UserHeader />
      {ITEMS.map(({value}) => <DropdownItem key={value} value={value} />)}
    </DropdownWrapper>
  )
}

export default Dropdown;