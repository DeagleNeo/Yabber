import styled from "styled-components"

const MenuItemWrapper = styled.li`
  margin-bottom: 5px;
`;

const ItemLink = styled.a`
  min-height: 40px;
  text-decoration: none;
  color: ${({active}) => active ? "#680a83" : "#f4eef6"};
  align-items: center;
  border-radius: 6px;
  display: flex;
  justify-content: flex-start;
  padding: 8px 15px;
  transition: all 0.2s ease-in-out 0s;
  background-color: ${({active}) => active ? "#fff" : "transparent"};

  :hover {
    background-color: #f4eef6;
    color: #680a83;
  }
`;

const Icon = styled.i`
  /* margin-right: 5px; */
  transition: all 0.2s ease-in-out 0s;
  display: inline-block;
`;

const Text = styled.span`
  margin-left: 10px;
  white-space: nowrap;
  transition: all 0.2s ease-in-out 0s;
  display: ${({sidebarDrawer}) => sidebarDrawer ? "none" : "inline-block"};
`;

const MenuItem = ({icon, value, active, onClick, sidebarDrawer}) => {
  return (
    <MenuItemWrapper onClick={onClick}>
      <ItemLink href="/" active={active}>
        <Icon className={icon} />
        <Text sidebarDrawer={sidebarDrawer}>{value}</Text>
      </ItemLink>
    </MenuItemWrapper>
  )
}

export default MenuItem;