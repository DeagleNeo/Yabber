import styled from "styled-components";
import MenuItem from "./components/MenuItem";

const SidebarWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  bottom: 0;
  left: 0;
  margin-top: 0;
  position: fixed;
  top: 60px;
  transition: all 0.2s ease-in-out 0s;
  width: ${({sidebarDrawer}) => sidebarDrawer ? "80px" : "240px"};
  /* z-index: 1001; */

  :hover {
    width: 240px;
    & span {
      display: inline-block;
    }
  }
`;

const SidebarInner = styled.div`
  overflow: hidden;
  width: 100%;
  min-height: 100%;
  background-color: #680a83;
  transition: all 0.2s ease-in-out 0s;
`;

const SidebarMenu = styled.ul`
  padding: 15px;
  color: #fff;
  list-style-type: none;
  font-size: 1rem;
`;

const ITEMS = [
  { icon: "gg-home-alt", value: "Dashboard" },
  { icon: "gg-mail", value: "Invitations" },
  // { icon: "gg-user-list", value: "Users" },
  // { icon: "gg-cast", value: "Channels" },
  // { icon: "gg-notes", value: "Messages" },
];

const Sidebar = ({ activeTab, setActiveTab, sidebarDrawer }) => {
  return (
    <SidebarWrapper sidebarDrawer={sidebarDrawer}>
      <SidebarInner>
        <SidebarMenu>
          {ITEMS.map(({ icon, value }) => (
            <MenuItem
              key={value}
              icon={icon}
              value={value}
              active={activeTab === value}
              onClick={(event) => {
                event.preventDefault();
                setActiveTab(value);
              }}
              sidebarDrawer={sidebarDrawer}
            />
          ))}
        </SidebarMenu>
      </SidebarInner>
    </SidebarWrapper>
  );
};

export default Sidebar;
