import styled from "styled-components";

const ButtonStyle = styled.button`
  /* background: transparent; */
  border: 1px solid transparent;
  padding: 0;
  outline: 0;
  font-size: inherit;
  background-color:#6610f2;
  color:#fff;
  height:50px;
  width:120px;
  cursor: pointer;
  position: absolute;
  right:0;
  bottom:0;
`;

const UploadBtn = () => {
  return <ButtonStyle>
    Browse File
  </ButtonStyle>;
};

export default UploadBtn;
