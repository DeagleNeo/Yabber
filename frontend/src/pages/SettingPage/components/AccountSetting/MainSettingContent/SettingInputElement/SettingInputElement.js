import styled from "styled-components";

const ElementWrapper = styled.div`
  box-sizing: border-box;
  margin-bottom: 1rem;
  position: relative;
`;

const StyledLabel = styled.label`
  font-weight: 600;
  color: #464646;
  margin-bottom: 0.5rem;
`;
const StyledInput = styled.input`
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #ede2ff;
  border-radius: 2px;
  height: 49px;
  padding: 10px;
  font-size: 14px;
  line-height: 1.6%;
  display: block;
  width: 100%;
  color: #212529;
  outline: none;
  margin-top: 0.5rem;
  min-height: calc(1.5em + 1rem + 2px);

  &:focus {
    border-color: #e6e6e6;
  }
`;

const StyledIcon = styled.div`
  z-index: 100;
  position: absolute;
  top: 2.8rem;
  right: 1.2rem;
`;

const SettingInputElement = ({
  id,
  label,
  type,
  value,
  onChange,
}) => {
  return (
    <ElementWrapper>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <br />
      <StyledInput
        type={type}
        id={id}
        onChange={onChange}
        value={value}
        width="100%"
      ></StyledInput>
    </ElementWrapper>
  );
};

export default SettingInputElement;
