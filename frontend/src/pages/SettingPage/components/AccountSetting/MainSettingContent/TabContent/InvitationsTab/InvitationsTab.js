
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 6px;
`
const Title = styled.div`
  padding: 15px;
  background: #F9F9F9;
  border-radius: 4px;
`
const H5 = styled.h5`
  color: #5A078B;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 7px;
  margin-top: 0;
  line-height: 1.2;
  margin: 0 0 7px;
`
const P = styled.p`
  color: #949494;
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 0;
`

const InvitationsTab = () => {
  return (
    <Wrapper>
      <Title>
        <H5>Invitations</H5>
        <P>List all your invitations</P>
      </Title>
    </Wrapper>
  )
}

export default InvitationsTab