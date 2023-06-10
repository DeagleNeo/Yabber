import styled from "styled-components";
import TabContentWrapper from "../components/TabContentWrapper";
import SubTitle from "../components/Subtitle/Subtitle";
import CreateOrgModal from "./CreateOrgModal/CreateOrgModal";
import { useState } from "react";

const PrimaryButton = styled.button`
  margin-bottom: 2rem;
  width: 300px;
  height: 60px;
  background: transparent;
  background-color: #ffffff;
  border: 1px solid #f4eeff;
  border-radius: 10px;
  font-size: 1.5rem;
  color: #5a078b;
  box-shadow: 5px 5px 0 #f5f8ff;
  cursor: pointer;
  &:hover {
    background-color: #f8f8ff;
  }

  @media screen and (max-width: 520px) {
    font-size: 1.3rem;
    width: 200px;
  }

  @media screen and (max-width: 420px) {
    font-size: 1.1rem;
    width: 180px;
    height: 50px;
  }
`;

const CreateOrganization = () => {
  const [orgModalOpen, setOrgModalOpen] = useState(false);

  const onClickHandler = (e) => {
    setOrgModalOpen(true);
  };

  return (
    <TabContentWrapper>
      <SubTitle>You may create an organization</SubTitle>
      <PrimaryButton onClick={onClickHandler}>CREATE</PrimaryButton>
      <CreateOrgModal
        setOrgModalOpen={setOrgModalOpen}
        orgModalOpen = {orgModalOpen}
      />
    </TabContentWrapper>
  );
};

export default CreateOrganization;
