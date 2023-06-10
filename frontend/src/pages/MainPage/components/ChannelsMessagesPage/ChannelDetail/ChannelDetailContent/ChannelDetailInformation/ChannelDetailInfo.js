import styled from "styled-components";
import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClickProfileContext from "../../../../../../../components/ClickProfile/ClickProfileContext";
import ChannelMember from "./ChannelMember";
import ModalsContext from "../../../../ModalsContext";
import Tooltip from "@mui/material/Tooltip";
import breakpoints from "../../../../../../../config/breakpoints";
import { SocketContext } from "../../../../SocketIoContext";

const ProfileInfoContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 0.5rem;
  display: block;
  flex-direction: column;
  background-color: white;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow: auto;
`;

const ChannelInfo = styled.div`
  display: flex;
  /* text-align: left; */
  flex-direction: column;
  /* justify-content: center; */
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  border-bottom: 1px solid transparent;
  border-color: #0057ff;
  @media screen and (max-width: ${breakpoints.ml}) {
    justify-content: center;
    align-items: flex-start;
  }
  @media screen and (min-width: ${breakpoints.ml}) {
    justify-content: center;
    align-items: center;
  }
`;
const ChannelTitle = styled.div`
  position: relative;
  padding: 0;
  text-transform: uppercase;
  font-size: 14px;
  color: #0057ff;
  font-weight: 1000;
  border-right: 10px;
  margin-left: 10px;
  /* border-bottom: 1px solid transparent;
  border-color: #0057ff; */
  white-space: nowrap;
  @media screen and (max-width: ${breakpoints.ml}) {
    bottom: -5px;
  }
`;

// const BorderLine = styled.div`

// width: 90%;
// height: 100%;
//   border-bottom: 1px solid #0057ff;
//   border-color: #0057ff;
//   position: absolute;
//   bottom: 0;
//   left: 5%;
// `;

const ChannelGroup = styled.div`
  padding-top: 20px;
  margin-top: 15px;
  overflow: auto;
`;
const ProfileInfo = () => {
  const ClickProfile = useContext(ClickProfileContext);
  const { members } = ClickProfile.channelInfo;
  const { onlineUsers } = useContext(SocketContext);
  const { showAddMemberModal } = useContext(ModalsContext);


  const sortByOnlineAndFirstName = (members, onlineUsers) => {
    members
      .sort((a, b) => a.firstName.localeCompare(b.firstName))
      .sort((a, b) => {
        const argA = onlineUsers.includes(a._id) ? 1 : 2;
        const argB = onlineUsers.includes(b._id) ? 1 : 2;
        return argA - argB;
      });

    return members;
  };



  const onclickHandler = (e) => {
    showAddMemberModal();
  };

    const onlineChannelMembers = onlineUsers.filter((onlineUser) => {
      for (let i = 0; i < members.length; i++) {
        if (onlineUser.toString().match(members[i]._id.toString())) {
          return onlineUser;
        }
      }
      return null;
    });



  return (
    <ProfileInfoContainer>
      <ChannelInfo>
        <Wrapper>
          <ChannelTitle>{`Members(${onlineChannelMembers.length}/${members?.length})`}</ChannelTitle>
          <Tooltip title="Add Member">
            <IconButton
              onClick={onclickHandler}
              fontSize="small"
              sx={{ p: "3px" }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </Wrapper>
        <ChannelGroup>
          {members &&
            sortByOnlineAndFirstName(members, onlineUsers).map((member) => {
              return (
                <ChannelMember
                  id={member._id}
                  key={member._id}
                  avatar={member.avatar}
                  name={member.firstName + " " + member.lastName}
                />
              );
            })}
        </ChannelGroup>
      </ChannelInfo>
    </ProfileInfoContainer>
  );
};
export default ProfileInfo;
