import { Button } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import {
  createChannelAndAddMembers,
  getOrganizationMembersExceptMe,
} from "../../../../../api/api";
import NameCard from "../components/NameCard/NameCard";
import ModalsContext from "../../ModalsContext";
import AddMemberSearchBar from "./AddMemberSearchBar";
import { SocketContext } from "../../SocketIoContext";
import { MultiChannelContext } from "../../../../../components/MultiChannel";
import { updateChannelVisitTime } from "../../../../../api/api";

const NameCardWrapper = styled.div`
  width: 100%;
  padding: 10px;
  height: 70%;
  overflow: scroll;
  border: 1px solid #f3ecff;
  border-radius: 10px;
`;

const buttonStyle = {
  position: "absolute",
  bottom: "25px",
  right: "25px",
};

const AddMember = ({ formData }) => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [buttonText, setButtonText] = useState("CREATE");
  const { orgId, hideCreateGroupModal, setActiveTab } =
    useContext(ModalsContext);

  const { onlineUsers } = useContext(SocketContext);
  const multiChannel = useContext(MultiChannelContext);

  const sortMemberList = (memberList) => {
    memberList.sort((a, b) => a.name.localeCompare(b.name));
    return memberList;
  };

  useEffect(() => {
    getOrganizationMembersExceptMe()
      .then((res) => {
        setMembers(sortMemberList(res.data.data));
      })
      .catch((error) => console.log(error.response))
      .finally(() => setLoading(false));
  }, []);

  const createGroup = () => {
    setButtonText("CREATING...");
    createChannelAndAddMembers({
      name: formData.groupName,
      description: formData.description,
      isPrivate: formData.type === "private",
      organization: orgId,
      memberIdArray: selectedUsers,
      avatar: formData.avatar,
    })
      .then((res) => {
        hideCreateGroupModal();
        setActiveTab("GROUP");
      })
      .catch((error) => console.log(error))
      .finally(() => setButtonText("CREATE"));

    multiChannel.currentChannel.current._id &&
      updateChannelVisitTime(
        multiChannel.currentChannel.current._id,
        new Date()
      );
  };

  const selectUser = (id) => {
    if (selectedUsers.includes(id)) {
      return setSelectedUsers(selectedUsers.filter((user) => user !== id));
    }
    setSelectedUsers((oldList) => [...oldList, id]);
  };

  const memberCards = members
    .filter((member) => {
      if (member.name.match(new RegExp(query, "i"))) return member;
      if (member.email.match(new RegExp(query, "i"))) return member;
      return null;
    })
    .map((person) => {
      const { name, email, _id: id, avatar } = person;
      return (
        <NameCard
          name={name}
          email={email}
          key={id}
          id={id}
          avatar={avatar}
          selectUser={selectUser}
          selectedUsers={selectedUsers}
          status={onlineUsers.some((userId) => userId === id.toString())}
        />
      );
    });
  return (
    <>
      <AddMemberSearchBar query={query} setQuery={setQuery} />

      <NameCardWrapper>{loading ? "Loading..." : memberCards}</NameCardWrapper>
      <Button
        variant="contained"
        size="large"
        sx={buttonStyle}
        onClick={createGroup}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default AddMember;
