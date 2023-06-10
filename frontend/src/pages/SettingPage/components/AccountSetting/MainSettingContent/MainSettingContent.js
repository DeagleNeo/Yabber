import { useState } from "react"
import styled from "styled-components"
import Tab from "./Tab"
import TabContent from "./TabContent"

const Wrapper = styled.div`
`

const MainSettingContent = ({
  userInfo,
  setUserInfo,
  currentUser,
}) => {
  const [activeTab, setActiveTab] = useState('GENERALSETTINGS_TAB')
  return (
    <Wrapper>
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent
        activeTab={activeTab}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        currentUser={currentUser}
      />
    </Wrapper>
  )
}

export default MainSettingContent