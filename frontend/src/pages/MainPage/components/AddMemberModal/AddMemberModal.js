import styled from "styled-components";
import { Modal, Tab, Tabs, Box } from "@mui/material";
import { useContext } from "react";
import ModalsContext from "../ModalsContext";
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

const AddMemberModal = () => {
  const { addMemberModalOpen, hideAddMemberModal } =
    useContext(ModalsContext);

  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal
      open={addMemberModalOpen}
      onClose={hideAddMemberModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleTabChange}>
            <Tab label="Add Member" />
            {/* <Tab label="Remove Member" /> */}
            <IconButton
              onClick={hideAddMemberModal}
              style={{
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
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tabs>
        </Box>
        <AddMember />
      </Container>
    </Modal>
  );
};

export default AddMemberModal;
