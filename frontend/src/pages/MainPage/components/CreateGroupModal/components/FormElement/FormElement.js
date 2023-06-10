import styled from 'styled-components'


const Wrapper = styled.div`
  & ~ & {
    margin-top: 30px;
  }

  position: relative;
`


const FormElement = ({
 
  children,
}) => (
  <Wrapper>
    {children}
   
    
  </Wrapper>
)

export default FormElement
