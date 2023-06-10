import styled from "styled-components";
import { Modal, Button } from "@mui/material";
import { useContext, useState,useEffect } from "react";
import ModalsContext from "../ModalsContext";
import { createDmAndAddUser, userChannels } from "../../../../api/api";
import { SocketContext } from "../SocketIoContext";

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

const ActiveColleague = styled.span`
  color: #5a078b;
`;

const CreateChatButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const CreateChatModal = () => {
  const [dms, setDms] = useState([]);
  const [, setLoading] = useState(true);

  const {
    orgId,
    createChatModalOpen,
    hideCreateChatModal,
    activeColleague,
    activeColleagueId,
    setActiveTab,
  } = useContext(ModalsContext);
  const { currentUser } = useContext(SocketContext);

  const cancelButtonHandler = () => {
    hideCreateChatModal();
  };

  const addButtonHandler = () => {
    createChat();
  };

  const createChat = () => {
    createDmAndAddUser({
      name: currentUser._id+activeColleagueId+orgId,
      organization: orgId,
      memberId: activeColleagueId,
    })
      .then((res) => {
        console.log(res.data);
        hideCreateChatModal();
        setActiveTab("CHAT");
      })
      .catch((error) => console.log(error))
      .finally();
  };

  useEffect(() => {
    userChannels("dms/summary")
      .then((res) => {
        setDms(res.data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  // if (loading) return <div>Loading...</div>;

  const isExistingChat = dms.some((chat) => chat.name === activeColleague);

  return (
    <Modal
      open={createChatModalOpen}
      onClose={hideCreateChatModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CreateChatContainer>
        {isExistingChat ? (
          <h2><ActiveColleague> {activeColleague} </ActiveColleague> already existed in Chat</h2>
        ) : (
          <h2>
            Do you want to add
            <ActiveColleague> {activeColleague} </ActiveColleague>
            to Chat?
          </h2>
        )}
        <CreateChatButtonGroup>
          <Button
            variant="contained"
            size="large"
            onClick={cancelButtonHandler}
          >
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={addButtonHandler} disabled={isExistingChat}>
            Add
          </Button>
        </CreateChatButtonGroup>
      </CreateChatContainer>
    </Modal>
  );
};

export default CreateChatModal;
