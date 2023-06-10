import styled from "styled-components"

const Elementor_element_for_section = styled.section`
    position: relative;
    --flex-direction: initial;
    --flex-wrap: initial;
    --justify-content: initial;
    --align-items: initial;
    --align-content: initial;
    --gap: initial;
    --flex-basis: initial;
    --flex-grow: initial;
    --flex-shrink: initial;
    --order: initial;
    --align-self: initial;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: initial;
    flex-wrap: initial;
    -webkit-box-pack: initial;
    justify-content: initial;
    -webkit-box-align: initial;
    align-items: initial;
    align-content: initial;
    gap: initial;
    flex-basis: initial;
    -webkit-box-flex: initial;
    flex-grow: initial;
    flex-shrink: initial;
    -webkit-box-ordinal-group: initial;
    order: initial;
    align-self: initial;
`

const Elementor_element_for_div = styled.div`
    position: relative;
    --flex-direction: initial;
    --flex-wrap: initial;
    --justify-content: initial;
    --align-items: initial;
    --align-content: initial;
    --gap: initial;
    --flex-basis: initial;
    --flex-grow: initial;
    --flex-shrink: initial;
    --order: initial;
    --align-self: initial;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: initial;
    flex-wrap: initial;
    -webkit-box-pack: initial;
    justify-content: initial;
    -webkit-box-align: initial;
    align-items: initial;
    align-content: initial;
    gap: initial;
    flex-basis: initial;
    -webkit-box-flex: initial;
    flex-grow: initial;
    flex-shrink: initial;
    -webkit-box-ordinal-group: initial;
    order: initial;
    align-self: initial;
`

const WidgetWrap = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    flex-wrap: wrap;
    align-content: flex-start;
`

const TitleSection = styled(Elementor_element_for_section)`
    width: 100%;
`

const TitleContainer = styled.div`
    max-width: 650px;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    position: relative;
    @media (max-width: 1024px) {
        flex-wrap: wrap;
    }
`

const Row = styled.div`
    width: 100%;
    display: flex;
    @media (max-width: 1024px) {
        flex-wrap: wrap;
}
`

const Column = styled(Elementor_element_for_div)`
    display: flex;
    min-height: 1px;
    width: 100%;
`

const TitleWidgetWrapper = styled(WidgetWrap)`
    padding: 10px;
`

const ColumnWrapper = styled.div`
    width: 100%;
    position: relative;
    display: flex;
}
`

const Elementor = styled(Elementor_element_for_div)`
    width: 100%;
`

const Transition = styled.div`
    transition: background .3s,border .3s,border-radius .3s,box-shadow .3s,-webkit-box-shadow .3s;
`

const InfoBox = styled.div`
    text-align: center;
    -webkit-box-pack: center;
    justify-content: center;
`

const LtRWrap = styled.div`
    width: 100%;
`

const Content = styled(LtRWrap)``

const TitleWrap = styled(LtRWrap)``

const TextWrap = styled.div``

const Title = styled.h2`
    margin: 0px 0px 10px 0px;
`

const Text = styled.div`
    margin: 0px 0px 0px 0px;
`

const TitleColumn = ({title, text}) => {
    return (
      <TitleSection>
        <TitleContainer>
          <Row>
            <Column>
              <ColumnWrapper>
                <TitleWidgetWrapper>
                  <Elementor>
                    <Transition>
                      <InfoBox>
                        <LtRWrap>
                          <Content>
                            <TitleWrap>
                              <Title>
                                {title}
                              </Title>
                            </TitleWrap>
                            <TextWrap>
                              <Text>
                                {text}
                              </Text>
                            </TextWrap>
                          </Content>
                        </LtRWrap>
                      </InfoBox>
                    </Transition>
                  </Elementor>
                </TitleWidgetWrapper>
              </ColumnWrapper>
            </Column>
          </Row>
        </TitleContainer>
      </TitleSection>
    );
}

export default TitleColumn
