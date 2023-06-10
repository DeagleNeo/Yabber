import { Alert } from "@mui/material";
import styled from "styled-components";

const Placeholder = styled.div`
  padding-top: 48.0156px;
`;

const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage) {
    return (
      <Alert severity="error" style={{ width: "100%" }}>
        {errorMessage}
      </Alert>
    );
  }
  return <Placeholder />;
};

export default ErrorMessage;
