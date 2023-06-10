import styled from "styled-components";

const SubmitBtnWrapper = styled.div`
  text-align: right;
`;

const Button = styled.button`
  background-color: #680a83;
  border: 1px solid #680a83;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
  outline: none;

  :hover {
    background-color: #57086d;
    border: 1px solid #57086d;
  }
`;

const SubmitBtn = ({children}) => {
  return (
    <SubmitBtnWrapper>
      <Button type="submit">{children}</Button>
    </SubmitBtnWrapper>
  )
}

export default SubmitBtn;