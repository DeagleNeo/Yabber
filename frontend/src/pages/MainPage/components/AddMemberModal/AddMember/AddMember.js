import { Button } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import {
  getOrganizationMembersExceptMe,
  addMemberstoChannel,
  getChannelInfo
} from "../../../../../api/api";
import NameCard from "../../CreateGroupModal/components/NameCard";
import ModalsContext from "../../ModalsContext";
import AddMemberSearchBar from "./AddMemberSearchBar";
import { SocketContext } from "../../SocketIoContext";
import ClickProfileContext from "../../../../../components/ClickProfile/ClickProfileContext";

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

const AddMember = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [query, setQuery] = useState("");
  const { hideAddMemberModal,setActiveTab } = useContext(ModalsContext);

  const { onlineUsers } = useContext(SocketContext);

  const { channelInfo,setChannelInfo } =
    useContext(ClickProfileContext);

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


  const onclickAddMember = () => {
    addMemberstoChannel({
      channelId: channelInfo._id,
      userIdArray: selectedUsers,
    })
    .then((res) => {
      hideAddMemberModal();
      setActiveTab("GROUP")
      getChannelInfo(channelInfo._id).then(async (response) => {
        setChannelInfo(response.data.data.channel);
      });
    })
    .catch((error) => console.log(error))
    .finally();
  };

  const selectUser = (id) => {
    if (selectedUsers.includes(id)) {
      return setSelectedUsers(selectedUsers.filter((user) => user !== id));
    }
    setSelectedUsers((oldList) => [...oldList, id]);
  };

  const newMembers = [];
  for (let i = 0; i < members.length; i++) {
    newMembers.push(members[i]);
    for (let j = 0; j < channelInfo.members.length; j++) {
      if (members[i]._id.toString() === channelInfo.members[j]._id.toString()) {
        newMembers.pop(members[i]);
        break;
      }
    }
  }

  const memberCards = newMembers
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
        onClick={onclickAddMember}
      >
        Add Member
      </Button>
    </>
  );
};

export default AddMember;
