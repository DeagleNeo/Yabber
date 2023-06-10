import styled from "styled-components";

const FormItemWrapper = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  color: #333;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  width: 100%;
  height: 40px;
  padding: 0.375rem 0.75rem;
  background-color: #fff;
  background-clip: padding-box;

  :focus {
    outline: 1px solid #680a83;
  }

`;

const ServerMessage = styled.div`
  font-size: 0.8rem;
  padding: 5px 12px;
  color: rgb(244, 67, 54);
`;

const FormItem = ({
  type,
  children,
  value,
  onChange,
  serverResponse,
  setServerResponse,
  required,
}) => {
  return (
    <FormItemWrapper>
      <Label>{children}</Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        onClick={() => setServerResponse("")}
        required={required}
      ></Input>
      <ServerMessage>{serverResponse}</ServerMessage>
    </FormItemWrapper>
  );
};

export default FormItem;
