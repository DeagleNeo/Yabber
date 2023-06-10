import styled from "styled-components";

const Button = styled.button`
  padding: 10px 20px;
  line-height: 1.6;
  border-radius: 0.375rem;
  background-color: #680a83;
  box-shadow: none;
  border: 2px solid #680a83;
  margin: 1rem auto 15px;
  outline: none;
  color: #fff;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  font-family: poppins;
  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    border: 3px solid orange;
  }

  &:disabled {
    background-color: #aaa;
    border-color: #aaa;
    cursor: default;
  }
`;

const SubmitButton = ({ text,disabled }) => {
  return (
    <Button disabled={disabled} type="submit">
      {text}
    </Button>
  );
};

export default SubmitButton;
