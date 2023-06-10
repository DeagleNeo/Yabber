import styled from "styled-components";
import OrgInfo from "./components/OrgInfo";
import Tabs from "./components/Tabs";

const SidebarHeaderContainer = styled.header`
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  overflow: initial;
  background: #5a078b;
  border-bottom-right-radius: 50px;
`;

const SidebarHeader = ({ organization, role }) => (
  <SidebarHeaderContainer>
    <OrgInfo organization={organization} role={role} />
    <Tabs />
  </SidebarHeaderContainer>
);

export default SidebarHeader;
