import styled from "styled-components";

const BtnGroup = styled.div`
display:flex;
flex-direction:row;
justify-content:flex-end;
`;

const AddBtn = styled.button`
  border: 1px solid transparent;
  padding: 0;
  outline: 0;
  font-size: inherit;
  background-color: #680a83;
  color: #fff;
  height: 48px;
  width: 150px;
  border-radius: 10px;
  cursor: pointer;

  right: 0;
  bottom: 0;
`;

const AddMember = ({setValue}) => {
  return (
    <BtnGroup>
      <AddBtn onClick={()=>setValue(1)}>Add Members</AddBtn>
    </BtnGroup>
  );
};

export default AddMember;
