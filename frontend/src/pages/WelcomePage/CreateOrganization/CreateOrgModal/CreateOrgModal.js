import styled from "styled-components";
import React from "react";
import { Modal } from "@mui/material";
import Input from "../../../MainPage/components/CreateGroupModal/components/Input";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { createOrg } from "../../../../api/api";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 14px 28px;
  /* width: 500; */
  /* height: 650px; */
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

const SubTitle = styled.p`
  line-height: 5px;
  color: #666666;
  font-weight: 900;
  font-size: 15px;
`;
const buttonStyle = {
  my: 3,
  // left: "50%",
};

const CreateOrgModal = ({ orgModalOpen, setOrgModalOpen }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      orgName: "",
      description: "",
    },
    onSubmit: (values) => {
      const name = values.orgName;
      const description = values.description;
      createOrg({ name, description }).then(async (response) => {
        const org = await response.data.data.org;
        sessionStorage.setItem("currentOrg", org._id);
        navigate("/main");
      });
    },
  });
  const handleClose = (e) => {
    setOrgModalOpen(false);
  };
  // console.log("hh00hh",orgModalOpen)
  return (
    <Modal
      open={orgModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <h2>Create Organization</h2>
        <form onSubmit={formik.handleSubmit}>
          <SubTitle>Organization Name</SubTitle>
          <Input
            id="orgName"
            name="orgName"
            onChange={formik.handleChange}
            value={formik.values.orgName}
          />

          <SubTitle>Description</SubTitle>
          <Input
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={buttonStyle}
          >
            Create
          </Button>
        </form>
      </Container>
    </Modal>
  );
};

export default CreateOrgModal;
