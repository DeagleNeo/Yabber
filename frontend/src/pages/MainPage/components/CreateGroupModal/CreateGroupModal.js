import styled from "styled-components";
import { Modal, Tab, Tabs, Box } from "@mui/material";
import { useContext } from "react";
import ModalsContext from "../ModalsContext";
import GroupInfo from "./GroupInfo";
import { useState } from "react";
import AddMember from "./AddMember";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Container = styled.div`
  padding: 14px 28px;
  width: 500px;
  height: 650px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

const CreateGroupModal = () => {
  const { createGroupModalOpen, hideCreateGroupModal } =
    useContext(ModalsContext);

  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const [formData, setFormData] = useState();

  return (
    <Modal
      open={createGroupModalOpen}
      onClose={hideCreateGroupModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleTabChange}>
            <Tab label="Create Group" />
            <Tab label="Add Member" />
          </Tabs>
          <IconButton
            onClick={hideCreateGroupModal}
            sx={{
              backgroundColor: "#EE00AB",
              color: "white",
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "auto",
              alignSelf: "center",
              position: "absolute",
              top: "25px",
              right: "28px",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {value === 0 && (
          <GroupInfo
            changeTab={setValue}
            setFormData={setFormData}
            formData={formData}
          />
        )}
        {value === 1 && <AddMember formData={formData} />}
        {value === 2 && <div>2</div>}
      </Container>
    </Modal>
  );
};

export default CreateGroupModal;
