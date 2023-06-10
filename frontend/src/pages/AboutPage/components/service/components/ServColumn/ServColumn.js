import styled from "styled-components";

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

const ColumnWrapper = styled.div`
    width: 100%;
    position: relative;
    display: flex;
}
`

const WidgetWrap = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    flex-wrap: wrap;
    align-content: flex-start;
`

const ServiceColumn = styled(Elementor_element_for_div)`
    display: flex;
    min-height: 1px;
    @media (min-width: 768px) {
        width: 25%;
    }
    @media (max-width: 767px) {
        width: 100%;
    }
`

const ServiceColumnWrapper = styled(ColumnWrapper)`
    margin: 0px 0px 0px 0px;
`

const ServiceWidgetWrapper = styled(WidgetWrap)`
    align-items: flex-start;
    padding: 10px 10px 10px 10px;
`

const Elementor = styled(Elementor_element_for_div)`
    width: 100%;
`

const WidgetContainer = styled.div`
    padding: 10px 10px 10px 10px;
    transition: background .3s,border .3s,border-radius .3s,box-shadow .3s,-webkit-box-shadow .3s;
    @media (max-width: 1024px) {
        padding: 30px 30px 30px 30px;
    }
    @media (max-width: 767px) {
        padding: 10px 10px 10px 10px;
    }
`

const InfoBox = styled.div`
    text-align: center;
    -webkit-box-pack: center;
    justify-content: center;
`

const LtRWrap = styled.div`
    width: 100%;
    min-width: 100%;
    display: block;
`

const Content = styled.div`
    width: 100%;
`

const ImgWrap = styled.div`
    display: block;
`

const ImgContent = styled.div`
    display: inline-block;
    line-height: 0;
    position: relative;
    max-width: 100%;
`

const Image = styled.img`
    transition-duration: 0.3s;
    width: 50px;
    display: inline;
    height: auto!important;
    max-width: 100%;
    box-sizing: content-box;
    border-radius: inherit;
    border: none;
    box-shadow: none;
    -webkit-transition: opacity .5s linear .2s;
    opacity: 1;
    @media (max-width: 1024px) {
        width: 40px;
    }
`

const TitleWrap = styled(Content)``
const TextWrap = styled.div``

const Title = styled.h4`
    margin: 20px 0px 10px 15px;
`

const Text = styled.div`
    margin: 0px 0px 0px 0px;
`

const ServColumn = ({src, title, text}) => {
    return (
      <ServiceColumn>
        <ServiceColumnWrapper>
          <ServiceWidgetWrapper>
            <Elementor>
              <WidgetContainer>
                <InfoBox>
                  <LtRWrap>
                    <Content>
                      <ImgWrap>
                        <ImgContent>
                          <Image width="50" height="50" src={src}></Image>
                        </ImgContent>
                      </ImgWrap>
                      <TitleWrap>
                        <Title>{title}</Title>
                      </TitleWrap>
                      <TextWrap>
                        <Text>{text}</Text>
                      </TextWrap>
                    </Content>
                  </LtRWrap>
                </InfoBox>
              </WidgetContainer>
            </Elementor>
          </ServiceWidgetWrapper>
        </ServiceColumnWrapper>
      </ServiceColumn>
    );
}

export default ServColumn