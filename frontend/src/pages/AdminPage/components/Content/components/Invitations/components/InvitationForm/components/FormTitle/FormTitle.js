import styled from "styled-components";

const FormTitleWrapper = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  margin-bottom: 0;
`;

const Text = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.2;
`;

const FormTitle = ({children}) => {
  return (
    <FormTitleWrapper>
      <Text>{children}</Text>
    </FormTitleWrapper>
  )
}

export default FormTitle;