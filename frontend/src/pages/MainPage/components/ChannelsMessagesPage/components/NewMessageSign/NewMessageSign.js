import styled from "styled-components";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const SignContainer = styled.div`
  color: green;
  font-size: 14px;
  text-align: center;
  position: relative;
  padding: 0px;
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 1;
    color: purple;
  }
  position: sticky;
  bottom: 1rem;
  /* right:2rem; */
`;

const NewMessageSign = ({ onClick }) => {
  return (
    <SignContainer onClick={onClick}>
      <KeyboardDoubleArrowDownIcon
        sx={{ position: "relative", bottom: "-8px" }}
      />
      new messages
    </SignContainer>
  );
};

export default NewMessageSign;
