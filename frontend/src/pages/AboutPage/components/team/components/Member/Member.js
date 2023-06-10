import styled from "styled-components"

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

const ImageColumn = styled(Elementor_element_for_div)`
    display: flex;
    min-height: 1px;
    @media (min-width: 768px) {
        width: 50%;
    }
    @media (max-width: 767px) {
        width: 100%;
    }
`

const ImageColumnWrapper = styled.div`
    margin: 0px 20px 0px 20px;
    width: 100%;
    position: relative;
    display: flex;
    @media (max-width: 1024px) {
        margin: 0px 10px 0px 0px;
    }
    @media (max-width: 767px) {
        margin: 0px 0px 20px 0px;
    }
`

const WidgetWrapper = styled.div`
    padding: 0px 0px 0px 0px;
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
`

const Element = styled(Elementor_element_for_div)`
    width: 100%;
`

const ElmentContainer = styled.div`
    padding: 0px 0px 25px 0px;
    background-color: #ffffff;
    border-radius: 0px 0px 0px 0px;
    transition: background .3s,border .3s,border-radius .3s,box-shadow .3s,-webkit-box-shadow .3s;
    @media (max-width: 767px) {
        margin: 0px 0px 0px 0px;
    }
`

const ElmentContainerUp = styled(ElmentContainer)`
    margin: -30px 0px 0px 0px;
`

const ElementContainerDown = styled(ElmentContainer)`
    margin: 30px 0px -30px 0px;
`

const TeamMember = styled.div`
    width: 100%;
    max-width: 100%;
`

const TeamMemberWrapper = styled.div`
    text-align: center;
`
const MemberWrapper = styled.div``

const ImageWrapper = styled.div`
    margin-bottom: 25px;
`

const Animation = styled.div``

const Image = styled.img`
    width: 350px;
    height: auto;
    max-width: 100%;
    border: none;
    border-radius: 0;
    box-shadow: none;
    transition: opacity .5s linear .2s;
    -webkit-transition: opacity .5s linear .2s;
    opacity: 1;
`

const ContentWrapper = styled.div`
    width: 100%;
`
const NameWrapper = styled.div``

const Name = styled.h4`
    color: #680a83;
    margin-bottom: 5px;
`
const DescWrapper = styled.div``

const Description = styled.div`
    font-size: 15px;
    text-transform: uppercase;
    color: #680a83;
    margin-bottom: 0px;
    padding: 0 10px;
    @media (max-width: 1024px) {
        font-size: 14px;
    }
`

const ElementContent = ({src, name, desc}) => {
    return (
        <TeamMember>
            <TeamMemberWrapper>
                <MemberWrapper>
                    <ImageWrapper>
                        <Animation>
                        <Image width="350" height="500" src={src}>
                        </Image>
                        </Animation>
                    </ImageWrapper>
                    <ContentWrapper>
                        <NameWrapper>
                            <Name>
                                {name}
                            </Name>
                        </NameWrapper>
                        <DescWrapper>
                            <Description>
                                {desc}
                            </Description>
                        </DescWrapper>
                    </ContentWrapper>
                </MemberWrapper>
            </TeamMemberWrapper>
        </TeamMember>
    )
}

const Member = ({up, src, name, desc}) => {
    return (
        <ImageColumn>
            <ImageColumnWrapper>
                <WidgetWrapper>
                    <Element>
                        {(up)?
                            <ElmentContainerUp>
                                <ElementContent src={src} name={name} desc={desc}/>
                            </ElmentContainerUp>:
                            <ElementContainerDown>
                                <ElementContent src={src} name={name} desc={desc}/>
                            </ElementContainerDown>
                        }
                    </Element>
                </WidgetWrapper>
            </ImageColumnWrapper>
        </ImageColumn>
    )
}

export default Member