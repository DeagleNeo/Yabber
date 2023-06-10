import styled from "styled-components";
import { Modal, Button } from "@mui/material";
import { useContext } from "react";
import ModalsContext from "../ModalsContext";
import { addUserToChannel } from "../../../../api/api";

const CreateChatContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 30px 30px 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
`;

const ActiveGroup = styled.span`
  color: #5a078b;
`;

const CreateChatButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const JoinGroupModal = () => {
  const {
    joinGroupModalOpen,
    hideJoinGroupModal,
    activeGroup,
    activeGroupId,
    setActiveTab,
  } = useContext(ModalsContext);

  const cancelButtonHandler = () => {
    hideJoinGroupModal();
  };

  const joinButtonHandler = () => {
    joinGroup();
  };

  const joinGroup = () => {
    addUserToChannel({
      channelId: activeGroupId,
    })
      .then((res) => {
        console.log(res.data);
        hideJoinGroupModal();
        setActiveTab("GROUP");
      })
      .catch((error) => console.log(error))
      .finally();
  };

  return (
    <Modal
      open={joinGroupModalOpen}
      onClose={hideJoinGroupModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CreateChatContainer>
        <h2>
          Do you want to join in
          <ActiveGroup> {activeGroup} </ActiveGroup> ?
        </h2>
        <CreateChatButtonGroup>
          <Button
            variant="contained"
            size="large"
            onClick={cancelButtonHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={joinButtonHandler}
          >
            Join
          </Button>
        </CreateChatButtonGroup>
      </CreateChatContainer>
    </Modal>
  );
};

export default JoinGroupModal;
