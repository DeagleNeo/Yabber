import styled from "styled-components"
// import example_photo1 from "../../../../assets/team-member01.jpg"
import SocialIcons from "../SocialIcons"

const Column = styled.div`
    display: flex;
    position: relative;
    min-height: 1px;
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
    @media (min-width: 768px) {
        width: 33.333%;
    }
    @media (max-width: 767px) {
        width: 100%;
    }
`
const Inner = styled.div`
    margin: 0px 10px 0px 10px;
    --e-column-margin-right: 10px;
    --e-column-margin-left: 10px;
    width: 100%;
    display: flex;
    position: relative;
    @media (max-width: 767px) {
        margin: 0px 0px 15px 0px;
        --e-column-margin-right: 0px;
        --e-column-margin-left: 0px;
    }
`

const CardWrap = styled.div`
    padding: 10px;
    display: flex;
    position: relative;
    width: 100%;
    flex-wrap: wrap;
    align-content: flex-start;
    @media (max-width: 1024px) {
        padding: 0px 0px 0px 0px;
    }
`

const CardElment = styled.div`
    width: 100%;
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

const WidgetContainer = styled.div`
    padding: 35px 25px 35px 25px;
    background-color: #ffffff;
    border-radius: 5px 5px 5px 5px;
    box-shadow: 0px 0px 30px 0px rgb(81 36 179 / 15%);
    transition: background .3s,border .3s,border-radius .3s,box-shadow .3s,-webkit-box-shadow .3s;
    @media (max-width: 1024px) {
        padding: 30px 20px 30px 20px;
    }
`

const TeamMember = styled.div`
    width: 100%;
    max-width: 100%;`

const Wrapper = styled.div`
    text-align: center;
`

const MemberWrap = styled.div`
    @media only screen and (max-width: 976px) {
        text-align: center;
    }
`

const MemberImage = styled.div`
    margin-bottom: 20px;
    @media only screen and (max-width: 976px) {
        text-align: center;
    }
`

const MemberContent = styled.div`
    width: 100%;
    @media only screen and (max-width: 976px) {
        text-align: center;
    }
`

const ImgWrap = styled.div`
`

const Image = styled.img`
    width: 180px;
    border-style: solid;
    border-width: 8px 8px 8px 8px;
    border-color: #e8edfc;
    border-radius: 100%;
    height: auto;
    max-width: 100%;
    border: none;
    box-shadow: none;
    opacity: 1;
`


const Name = styled.div`
`
const Designation = styled.div`
`
const NameContent = styled.h4`
    font-weight: 500;
    margin-bottom: 10px;
    padding: 0 10px;
    @media (max-width: 1024px) {
        margin-bottom: 5px;
    }
`

const DesigContent = styled.div`
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 15px;
    padding: 0 10px;
    @media (max-width: 1024px) {
        margin-bottom: 10px;
    }
`

const Speparator = styled.div`
    padding-bottom: 18px;
    line-height: 0;
    @media (max-width: 1024px) {
        padding-bottom: 10px;
    }
    @media only screen and (max-width: 976px) {
        text-align: center;
    }
`

const SpearateSpan = styled.span`
    border-top-width: 2px;
    border-top-color: #680a83;
    width: 20%;
    border-top-style: solid;
    display: inline-block;
`

const Desc = styled.div`
`

const DescContent = styled.div`
    color: #5c5f6d;
    margin-bottom: 20px;
    padding: 0 10px;
    @media (max-width: 1024px) {
        margin-bottom: 10px;
    }
`

const IconsWrapper = styled.div`
    @media only screen and (max-width: 976px) {
        text-align: center;
    }
`

const MemberCard = ({ src, name, jobTitle, description, linkedInLink, emailLink, facebookLink }) => {
    return (
      <Column>
        <Inner>
          <CardWrap>
            <CardElment>
              <WidgetContainer>
                <TeamMember>
                  <Wrapper>
                    <MemberWrap>
                      <MemberImage>
                        <ImgWrap>
                          <Image
                            width="180"
                            height="180"
                            src={src}
                            alt="team member"
                          ></Image>
                        </ImgWrap>
                      </MemberImage>
                      <MemberContent>
                        <Name>
                          <NameContent>{name}</NameContent>
                        </Name>
                        <Designation>
                          <DesigContent>{jobTitle}</DesigContent>
                        </Designation>
                        <Speparator>
                          <SpearateSpan />
                        </Speparator>
                        <Desc>
                          <DescContent>
                            {description}
                          </DescContent>
                        </Desc>
                        <IconsWrapper>
                            <SocialIcons linkedInLink={linkedInLink} emailLink={emailLink} facebookLink={facebookLink}/>
                        </IconsWrapper>
                      </MemberContent>
                    </MemberWrap>
                  </Wrapper>
                </TeamMember>
              </WidgetContainer>
            </CardElment>
          </CardWrap>
        </Inner>
      </Column>
    );
}

export default MemberCard