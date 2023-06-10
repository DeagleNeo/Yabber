import React, { useState } from "react";
import ClickProfileContext from "./ClickProfileContext";

const ClickProfile = ({ children }) => {
  const currentUser = JSON.parse(
    sessionStorage.getItem("currentUser") || localStorage.getItem("currentUser")
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSideBarOpen,setIsSideBarOpen] = useState(true)
  const [userInfo, setUserInfo] = useState(currentUser);
  const [channelInfo, setChannelInfo] = useState({ name: "team",members:[]});
  const [channelList, setChannelList] = useState();
  const [tab, setTab] = useState("GROUP");
  const [refreshMembers, setRefreshMembers] = useState(false);

  return (
    <ClickProfileContext.Provider
      value={{
        isDrawerOpen,
        setIsDrawerOpen,
        isSideBarOpen,
        setIsSideBarOpen,
        userInfo,
        setUserInfo,
        currentUser,
        channelInfo,
        setChannelInfo,
        channelList,
        setChannelList,
        tab,
        setTab,
        refreshMembers,
        setRefreshMembers,
      }}
    >
      {children}
    </ClickProfileContext.Provider>
  );
};

export default ClickProfile;
