import styled from "styled-components";
import TabItem from "./components/TabItem";
import { useContext } from "react";
import ClickProfileContext from "../../../../../../../../components/ClickProfile/ClickProfileContext";
import ModalsContext from "../../../../../ModalsContext";

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;

const TABS = [
  {
    href: "CHAT",
    children: "Chat",
  },
  {
    href: "GROUP",
    children: "Group",
  },
  {
    href: "DISCOVER",
    children: "Discover",
  },
];

const Tabs = () => {
  const ClickProfile = useContext(ClickProfileContext);
  const { activeTab, setActiveTab } = useContext(ModalsContext);

  return (
    <TabsContainer>
      {TABS.map(({ href, children }) => (
        <TabItem
          key={href}
          active={activeTab === href}
          onClick={(event) => {
            event.preventDefault();
            setActiveTab(href);
            ClickProfile.setTab(href);
            if (href === "DISCOVER"){
              ClickProfile.setIsDrawerOpen(false)
            }

          }}
        >
          {children}
        </TabItem>
      ))}
    </TabsContainer>
  );
};

export default Tabs;
