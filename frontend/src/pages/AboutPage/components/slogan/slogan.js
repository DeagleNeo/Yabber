import styled from "styled-components"
import background_overlay from "../../../../assets/about-bg-1.png";


const Section = styled.section`
    background-color: transparent;
    background-image: linear-gradient(180deg, #3A1B95 0%, #6932B7 100%);
    transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
    padding: 150px 0px 200px 0px;
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
    @media (max-width: 1024px) {
        padding: 150px 80px 150px 80px;
    }
    @media (max-width: 767px) {
        padding: 150px 20px 120px 20px;
    }
`

const BackgroundOverlay = styled.div`
    background-color: #680a83;
    background-image: url(${({ src }) => src});
    background-position: top left;
    background-repeat: no-repeat;
    opacity: 1;
    transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    @media (min-width: 1025px) {
        background-attachment: scroll;
    }
`

const BackgroundBottom = styled.div`
    bottom: -1px;
    overflow: hidden;
    position: absolute;
    left: 0;
    width: 100%;
    line-height: 0;
    direction: ltr;
`

const Svg = styled.svg`
    width: calc(200% + 1.3px);
    height: 100px;
    display: block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
`

const Path = styled.path`
    fill: #fff;
    transform-origin: center;
    transform: rotateY(0deg);
`

const Container = styled.div`
    max-width: 600px;
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

const Column = styled.div`
    position: relative;
    display: flex;
    min-height: 1px;
    width: 100%;
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

const ColumnInner = styled.div`
    margin: 0% 0% 0% 0%;
    --e-column-margin-right: 0%;
    --e-column-margin-left: 0%;
    width: 100%;
    display: flex;
    position: relative;
`

const ElmentWrap = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    flex-wrap: wrap;
    align-content: flex-start;
    @media (max-width: 767px) {
        padding: 0px 0px 0px 0px;
    }
`

const Element = styled.div`
    position: relative;
    width: 100%;
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

const Transition = styled.div`
    transition: background .3s,border .3s,border-radius .3s,box-shadow .3s,-webkit-box-shadow .3s;
`

const ContentWrap = styled.div`
    text-align: center;
    -webkit-box-pack: center;
    justify-content: center;
`

const InfoBox = styled.div`
    display: block;
    min-width: 100%;
    width: 100%;

`

const InfoBoxContent = styled.div`
    width: 100%;

`

const TitleWrap = styled.div`
    width: 100%;
`

const Title = styled.h1`
    color: #FFFFFF;
    margin: 0px 0px 26px 0px;
    @media (max-width: 767px) {
        margin: 0px 0px 20px 0px;
    }
`

const Break = styled.div`
    margin: 0px 0px 0px 0px;
    @media (max-width: 767px){
        margin: 0px 0px 15px 0px;
    }
`

const TextWrap = styled.div`
`

const Text= styled.div`
    font-size: 30px;
    color: #FFFFFF;
    margin: 0px 0px 0px 0px;
    @media (max-width: 1024px) {
        font-size: 1.5em;
    }
    @media (max-width: 767px) {
        font-size: 1.35em;
        margin: 0px 0px 0px 0px;
    }
    `

const SloganSection = () => {
    return (
        <Section>
            <BackgroundOverlay src={background_overlay}/>
            <BackgroundBottom>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <Path d="M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9c-23.6-4.9-52.6-7.8-75.5-5.3
	c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V100h1000V65.3
	c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z"></Path>
                </Svg>
            </BackgroundBottom>
            <Container>
                <Row>
                    <Column>
                        <ColumnInner>
                            <ElmentWrap>
                                <Element>
                                    <Transition>
                                        <ContentWrap>
                                            <InfoBox>
                                                <InfoBoxContent>
                                                    <TitleWrap>
                                                        <Title>
                                                            Team Member
                                                        </Title>
                                                    </TitleWrap>
                                                    <Break/>
                                                    <TextWrap>
                                                        <Text>
                                                            Yabber makes it downright pleasant to work together
                                                        </Text>
                                                    </TextWrap>
                                                </InfoBoxContent>
                                            </InfoBox>
                                        </ContentWrap>
                                    </Transition>
                                </Element>
                            </ElmentWrap>
                        </ColumnInner>
                    </Column>
                </Row>
            </Container>
        </Section>
    );
}




export default SloganSection