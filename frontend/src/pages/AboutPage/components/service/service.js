import styled from "styled-components"
import TitleColumn from "./components/TitleColumn"
import ServColumn from "./components/ServColumn"
import service1 from "../../../../assets/service1.png"
import service2 from "../../../../assets/service2.png"
import service3 from "../../../../assets/service3.png"
import service4 from "../../../../assets/service4.png"


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

const Section = styled(Elementor_element_for_section)`
    background-color: #F6F8FF;
    transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
    padding: 50px 0px 100px 0px;
    @media (max-width: 1024px) {
        padding: 50px 0px 50px 0px;
    }
`

const ElementorContainer = styled.div`
    max-width: 1200px;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    position: relative;
    @media (max-width: 1024px) {
        max-width: 1024px;
        flex-wrap: wrap;
    }
    @media (max-width: 767px) {
        max-width: 767px;
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

const ColumnWrapper = styled.div`
    width: 100%;
    position: relative;
    display: flex;
}
`

const WidgetWrapper = styled(WidgetWrap)`
    padding: 0px 0px 0px 0px;
`

// const TitleSection = styled(Elementor_element_for_section)`
//     width: 100%;
// `

const ServSection = styled(Elementor_element_for_section)`
    width: 100%;
    margin-top: 40px;
    margin-bottom: 0px;
    @media (max-width: 767px) {
        padding: 0px 0px 0px 0px;
    }
`

// const TitleContainer = styled.div`
//     max-width: 650px;
//     display: flex;
//     margin-right: auto;
//     margin-left: auto;
//     position: relative;
//     @media (max-width: 1024px) {
//         flex-wrap: wrap;
//     }

// `

// const TitleWidgetWrapper = styled(WidgetWrap)`
//     padding: 10px;
// `

// const Transition = styled.div`
//     transition: background .3s,border .3s,border-radius .3s,box-shadow .3s,-webkit-box-shadow .3s;
// `

// const Content = styled(LtRWrap)``

// const TitleWrap = styled(LtRWrap)``

// const TextWrap = styled.div``

// const Title = styled.h2`
//     margin: 0px 0px 10px 0px;
// `

// const ServiceColumn = styled(Elementor_element_for_div)`
//     display: flex;
//     min-height: 1px;
//     @media (min-width: 768px) {
//         width: 25%;
//     }
//     @media (max-width: 767px) {
//         width: 100%;
//     }
// `

// const ServiceColumnWrapper = styled(ColumnWrapper)`
//     margin: 0px 0px 0px 0px;
// `

// const ServiceWidgetWrapper = styled(WidgetWrap)`
//     align-items: flex-start;
//     padding: 10px 10px 10px 10px;
// `

// const Elementor = styled(Elementor_element_for_div)`
//     width: 100%;
// `

// const WidgetContainer = styled.div`
//     padding: 10px 10px 10px 10px;
//     transition: background .3s,border .3s,border-radius .3s,box-shadow .3s,-webkit-box-shadow .3s;
//     @media (max-width: 1024px) {
//         padding: 30px 30px 30px 30px;
//     }
//     @media (max-width: 767px) {
//         padding: 10px 10px 10px 10px;
//     }
// `

// const InfoBox = styled.div`
//     text-align: center;
//     -webkit-box-pack: center;
//     justify-content: center;
// `

// const LtRWrap = styled.div`
//     width: 100%;
//     min-width: 100%;
//     display: block;
// `

// const Content = styled.div`
//     width: 100%;
// `

// const ImgWrap = styled.div`
//     display: block;
// `

// const ImgContent = styled.div`
//     display: inline-block;
//     line-height: 0;
//     position: relative;
//     max-width: 100%;
// `

// const Image = styled.img`
//     transition-duration: 0.3s;
//     width: 50px;
//     display: inline;
//     height: auto!important;
//     max-width: 100%;
//     box-sizing: content-box;
//     border-radius: inherit;
//     border: none;
//     box-shadow: none;
//     -webkit-transition: opacity .5s linear .2s;
//     opacity: 1;
//     @media (max-width: 1024px) {
//         width: 40px;
//     }
// `

// const TitleWrap = styled(Content)``
// const TextWrap = styled.div``

// const Title = styled.h4`
//     margin: 20px 0px 10px 15px;
// `

// const Text = styled.div`
//     margin: 0px 0px 0px 0px;
// `

const ServiceSection = () => {
    return (
        <Section>
            <ElementorContainer>
                <Row>
                    <Column>
                        <ColumnWrapper>
                            <WidgetWrapper>
                                <TitleColumn title="All you need for Your Meet the Team Page!" text="Use the trendiest Team member widget for Elementor to incorporate your team’s information in a style that will suit your website."/>
                                {/* <TitleSection>
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
                                                                                    All you need for Your Meet the Team Page!
                                                                                </Title>
                                                                            </TitleWrap>
                                                                            <TextWrap>
                                                                                <Text>
                                                                                    Use the trendiest Team member widget for Elementor to incorporate your team’s information in a style that will suit your website.
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
                                </TitleSection> */}

                                <ServSection>
                                    <ElementorContainer>
                                        <Row>
                                            <ServColumn src={service1} title="Image Styling Options" text="You can alter the image position, shape, hover effects, etc. for each team member you display." />
                                            <ServColumn src={service2} title="Content Styling" text="You can customize and display stylish names, designations and descriptions within the widget." />
                                            <ServColumn src={service3} title="Additional Information" text="You can add social profile links to each member block & personalize the team member section." />
                                            <ServColumn src={service4} title="Responsive Design" text="The team member widget is looks great on all screen sizes and devices that users may use." />
                                            {/* <ServiceColumn>
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
                                                            </WidgetContainer>
                                                        </Elementor>
                                                    </ServiceWidgetWrapper>
                                                </ServiceColumnWrapper>
                                            </ServiceColumn> */}
                                        </Row>
                                    </ElementorContainer>
                                </ServSection>
                            </WidgetWrapper>
                        </ColumnWrapper>
                    </Column>
                </Row>
            </ElementorContainer>
        </Section>
    );
}




export default ServiceSection