import styled from "styled-components"
import highlight1 from "../../../../assets/highlight1.jpg"
import highlight2 from "../../../../assets/highlight2.jpg"
import Member from "./components/Member"
import DescComp from "./components/DescComp"

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

// ## Change background image here
const Section = styled(Elementor_element_for_section)`
    background-image: url(https://ultimateelementor.com/wp-content/uploads/2019/08/restaurant-bg.jpg);
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
    padding: 150px 0px 150px 0px;
    @media (min-width: 1025px) {
        background-attachment: scroll;
    }
    @media (max-width: 1024px) {
        padding: 100px 20px 100px 20px;
    }
`

const BackgroundOverlay = styled.div`
    background-color: #0c0000;
    opacity: 0.75;
    transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
`

const DisplayContainer = styled.div`
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

const TextColumn = styled(Elementor_element_for_div)`
    display: flex;
    min-height: 1px;
    @media (min-width: 768px) {
        width: 45%;
    }
    @media (max-width: 767px) {
        width: 100%;
    }
`

const CardColumn = styled(Elementor_element_for_div)`
    display: flex;
    min-height: 1px;
    @media (min-width: 768px) {
        width: 54.665%;
    }
    @media (max-width: 767px) {
        width: 100%;
    }
`

const ColumnWrapper = styled.div`
    width: 100%;
    position: relative;
    display: flex;
`

const TextWrapper = styled.div`
    align-content: center;
    align-items: center;
    padding: 0px 50px 0px 0px;
    display: flex;
    position: relative;
    width: 100%;
    flex-wrap: wrap;
    @media (max-width: 1024px) {
        padding: 0px 20px 0px 0px;
    }
`

const Title = styled(Elementor_element_for_div)`
    &:not(:last-child) {
        margin-bottom: 20px;
    }
    width: 100%;
`

const Text = styled(Elementor_element_for_div)`
    width: 100%;
    text-align: left;
`

const Transition = styled.div`
    transition: background .3s,border .3s,border-radius .3s,box-shadow .3s,-webkit-box-shadow .3s;
`

const InfoBox = styled.div`
    text-align: left;
    -webkit-box-pack: start;
    justify-content: flex-start;

`

const Content = styled.div`
    width: 100%;
`

const TitleTextWrapper = styled.div`
    width: 100%;
`

const AbstractWrapper = styled.div``

const TitleText = styled.h3`
    font-weight: 600;
    font-size: 34px;
    color: #ffffff;
    margin: 0px 0px 10px 0px;
`

const Abstract = styled.div`
    color: #ffffff;
    margin: 0px 0px 0px 0px;
`

const DescInList = styled.ul`
    list-style-type: none;
    list-style-position: initial;
    list-style-image: initial;
    margin: 0;
    padding: 0;
`

// const Desc = styled.li`
//     padding-bottom: 5px;
//     -webkit-box-pack: start;
//     justify-content: flex-start;
//     text-align: left;
//     display: flex;
//     -webkit-box-align: center;
//     align-items: center;
//     font-size: inherit;
//     margin: 0;
//     padding: 0;
//     position: relative;
//     &:after {
//         bottom: 0;
//         left: 0;
//         position: absolute;
//         width: 100%;
//     }
//     @media (max-width: 1024px) {
//         &:after {
//             right: 0;
//         }
//     }
// `

// const ListIcon = styled.span`
//     display: flex;
// `

// const Icon = styled.i`
//     color: #ffffff;
//     width: 1.25em;
//     font-size: 22px;
// `

// const ListItemText = styled.span`
//     font-weight: 500;
//     color: #ffffff;
//     display: inline-block;
//     align-self: center;
//     padding-left: 5px;
//     @media (max-width: 767px) {
//         font-size: 14px;
//     }
// `

// const DescComp = ({text}) => {
//     return (
//         <Desc>
//             <ListIcon>
//                 <Icon className="fa-solid fa-angle-right"></Icon>
//             </ListIcon>
//             <ListItemText>
//                 {text}
//             </ListItemText>
//         </Desc>
//     )
// }

const CardColumnWrapper = styled(ColumnWrapper)`
    @media {
        margin: 0px 0px 0px 0px;
    }
`

const ImagesWrapper = styled.div`
    align-content: flex-start;
    align-items: flex-start;
    padding: 0px 0px 0px 0px;
    display: flex;
    position: relative;
    width: 100%;
    flex-wrap: wrap;
    @media (max-width: 767px) {
        padding: 50px 0px 0px 0px;
    }
`

const ImageGround = styled(Elementor_element_for_section)`
    width: 100%;
`

// const ImageColumn = styled(Elementor_element_for_div)`
//     display: flex;
//     min-height: 1px;
//     @media (min-width: 768px) {
//         width: 50%;
//     }
//     @media (max-width: 767px) {
//         width: 100%;
//     }
// `

// const ImageColumnWrapper = styled.div`
//     margin: 0px 20px 0px 20px;
//     width: 100%;
//     position: relative;
//     display: flex;
//     @media (max-width: 1024px) {
//         margin: 0px 10px 0px 0px;
//     }
//     @media (max-width: 767px) {
//         margin: 0px 0px 20px 0px;
//     }
// `

// const WidgetWrapper = styled.div`
//     padding: 0px 0px 0px 0px;
//     width: 100%;
//     position: relative;
//     display: flex;
//     flex-wrap: wrap;
//     align-content: flex-start;
// `

// const Element = styled(Elementor_element_for_div)`
//     width: 100%;
// `

// const ElmentContainer = styled.div`
//     margin: -30px 0px 0px 0px;
//     padding: 0px 0px 25px 0px;
//     background-color: #ffffff;
//     border-radius: 0px 0px 0px 0px;
//     transition: background .3s,border .3s,border-radius .3s,box-shadow .3s,-webkit-box-shadow .3s;
//     @media (max-width: 767px) {
//         margin: 0px 0px 0px 0px;
//     }
// `

// const TeamMember = styled.div`
//     width: 100%;
//     max-width: 100%;
// `

// const TeamMemberWrapper = styled.div`
//     text-align: center;
// `

// const MemberWrapper = styled.div``

// const ImageWrapper = styled.div`
//     margin-bottom: 25px;
// `

// const Animation = styled.div``

// const Image = styled.img`
//     width: 350px;
//     height: auto;
//     max-width: 100%;
//     border: none;
//     border-radius: 0;
//     box-shadow: none;
//     transition: opacity .5s linear .2s;
//     -webkit-transition: opacity .5s linear .2s;
//     opacity: 1;
// `

// const ContentWrapper = styled.div`
//     width: 100%;
// `
// const NameWrapper = styled.div``

// const Name = styled.h4`
//     color: #680a83;
//     margin-bottom: 5px;
// `
// const DescWrapper = styled.div``

// const Description = styled.div`
//     font-size: 15px;
//     text-transform: uppercase;
//     color: #680a83;
//     margin-bottom: 0px;
//     padding: 0 10px;
//     @media (max-width: 1024px) {
//         font-size: 14px;
//     }
// `

const TeamSection = () => {
    return (
        <Section>
            <BackgroundOverlay/>
            <DisplayContainer>
                <Row>
                    <TextColumn>
                        <ColumnWrapper>
                            <TextWrapper>
                                <Title>
                                   <Transition>
                                        <InfoBox>
                                            <Content>
                                                <TitleTextWrapper>
                                                    <TitleText>
                                                        {/* ## Should be renamed to Team Highlights for example */}
                                                        Creative Team Sections
                                                    </TitleText>
                                                </TitleTextWrapper>
                                                <AbstractWrapper>
                                                    <Abstract>
                                                        {/* ## Should be changed */}
                                                        Create an attractive team member section like this and add the team member widgets to highlight the main heads behind your wonderful team.
                                                    </Abstract>
                                                </AbstractWrapper>
                                            </Content>
                                        </InfoBox>
                                    </Transition> 
                                </Title>
                                <Text>
                                    <Transition>
                                        <DescInList>
                                            {/* ## Should be changed */}
                                            <DescComp text="Advanced Styling Options to Suit Your Website" />
                                            <DescComp text="Dedicated Fields to help you" />
                                            <DescComp text="Take Control of the Margins Between Fields" />
                                        </DescInList>
                                    </Transition>
                                </Text>
                            </TextWrapper>
                        </ColumnWrapper>
                    </TextColumn>
                    <CardColumn>
                        <CardColumnWrapper>
                            <ImagesWrapper>
                                <ImageGround>
                                    <DisplayContainer>
                                        <Row>
                                            <Member up src={highlight1} name="Bill Gates" desc="Italian Chef" />
                                            <Member src={highlight2} name="James Bond" desc="Thai Chef" />
                                            {/* <ImageColumn>
                                                <ImageColumnWrapper>
                                                    <WidgetWrapper>
                                                        <Element>
                                                            <ElmentContainer>
                                                                <TeamMember>
                                                                    <TeamMemberWrapper>
                                                                        <MemberWrapper>
                                                                            <ImageWrapper>
                                                                                <Animation>
                                                                                    <Image width="350" height="500" src={highlight1}>
                                                                                    </Image>
                                                                                </Animation>
                                                                            </ImageWrapper>
                                                                            <ContentWrapper>
                                                                                <NameWrapper>
                                                                                    <Name>
                                                                                        Bill Gates
                                                                                    </Name>
                                                                                </NameWrapper>
                                                                                <DescWrapper>
                                                                                    <Description>
                                                                                        Italian Chef
                                                                                    </Description>
                                                                                </DescWrapper>
                                                                            </ContentWrapper>
                                                                        </MemberWrapper>
                                                                    </TeamMemberWrapper>
                                                                </TeamMember>
                                                            </ElmentContainer>
                                                        </Element>
                                                    </WidgetWrapper>
                                                </ImageColumnWrapper>
                                            </ImageColumn> */}
                                        </Row>
                                    </DisplayContainer>
                                </ImageGround>
                            </ImagesWrapper>
                        </CardColumnWrapper>
                    </CardColumn>
                </Row>
            </DisplayContainer>
        </Section>
    )
}

export default TeamSection