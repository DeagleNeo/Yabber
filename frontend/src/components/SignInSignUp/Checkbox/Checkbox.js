import styled from "styled-components"

const StyledLabel = styled.label`
  color: #464646;
  cursor: pointer;
`

const StyledInput = styled.input`
  top: 6px;
  border: 1px solid #ede2ff;
  border-radius: 5px;
  width: 23px;
  height: 23px;
  position: relative;
  accent-color: #420ba1;
  cursor: pointer;
`

const Checkbox = ({ text, onChange, checked, id = "checkbox" }) => {
  return (

    <StyledLabel htmlFor={id}>
      <StyledInput
        type="checkbox"
        onChange={onChange}
        checked={checked}
        id={id}
      />
      &nbsp;{text}
    </StyledLabel>
  )
}

export default Checkbox
