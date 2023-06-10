import { useState } from "react";
import ModalsContext from "./ModalsContext";

const ModalsContextProvider = ({ children }) => {
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [createChatModalOpen, setCreateChatModalOpen] = useState(false);
  const [joinGroupModalOpen, setJoinGroupModalOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [reactionListDialogOpen, setReactionListDialogOpen] = useState(false);
  const [reactionMsgId, setReactionMsgId] = useState();
  const [role, setRole] = useState();
  const [orgId, setOrgId] = useState();
  const [activeTab, setActiveTab] = useState("GROUP");
  const [activeColleague, setActiveColleague] = useState();
  const [activeColleagueId, setActiveColleagueId] = useState();
  const [activeGroup, setActiveGroup] = useState();
  const [activeGroupId, setActiveGroupId] = useState();

  const showCreateGroupModal = () => setCreateGroupModalOpen(true);
  const hideCreateGroupModal = () => setCreateGroupModalOpen(false);
  const showCreateChatModal = () => setCreateChatModalOpen(true);
  const hideCreateChatModal = () => setCreateChatModalOpen(false);
  const showJoinGroupModal = () => setJoinGroupModalOpen(true);
  const hideJoinGroupModal = () => setJoinGroupModalOpen(false);
  const showAddMemberModal = () => setAddMemberModalOpen(true);
  const hideAddMemberModal = () => setAddMemberModalOpen(false);

  return (
    <ModalsContext.Provider
      value={{
        createGroupModalOpen,
        showCreateGroupModal,
        hideCreateGroupModal,
        createChatModalOpen,
        showCreateChatModal,
        hideCreateChatModal,
        joinGroupModalOpen,
        showJoinGroupModal,
        hideJoinGroupModal,
        addMemberModalOpen,
        showAddMemberModal,
        hideAddMemberModal,
        role,
        setRole,
        orgId,
        setOrgId,
        activeTab,
        setActiveTab,
        activeColleague,
        setActiveColleague,
        activeColleagueId,
        setActiveColleagueId,
        activeGroup,
        setActiveGroup,
        activeGroupId,
        setActiveGroupId,
        reactionListDialogOpen,
        setReactionListDialogOpen,
        reactionMsgId,
        setReactionMsgId,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsContextProvider;
