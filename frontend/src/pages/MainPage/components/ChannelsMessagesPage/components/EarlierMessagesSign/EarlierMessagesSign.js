import styled from "styled-components";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

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
`;

const EarlierMessagesSign = ({ onClick, moreMsg }) => {
  return (
    <>
      <SignContainer onClick={moreMsg ? onClick : null}>
        {moreMsg === true && (
          <>
            <KeyboardDoubleArrowUpIcon
              sx={{ position: "relative", bottom: "-6px" }}
            />
            earlier messages
          </>
        )}
        {moreMsg === false && "no more messages"}
      </SignContainer>
    </>
  );
};

export default EarlierMessagesSign;
