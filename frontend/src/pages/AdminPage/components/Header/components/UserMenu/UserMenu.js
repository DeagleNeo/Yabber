import { useState } from "react";
import styled from "styled-components"
import Dropdown from "./components/Dropdown";
import MenuLink from "./components/MenuLink";

const UserMenuWrapper = styled.div`

`;


const UserMenu = () => {
  const [show, setShow] = useState(false);

  return (
    <UserMenuWrapper>
      <MenuLink show={show} setShow={setShow} />
      <Dropdown show={show} />
    </UserMenuWrapper>
  )
}

export default UserMenu;