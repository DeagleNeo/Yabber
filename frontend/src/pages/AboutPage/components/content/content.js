import styled from "styled-components"
import SloganSection from "../slogan"
import CardsSection from "../cards"
// import TeamSection from "../team"
import ServiceSection from "../service"
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    .borderbox *, .borderbox :after, .borderbox :before {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
`

const Container = styled.div`
    max-width: 100%;
    padding: 0;
    margin-left: auto;
    margin-right: auto;
    &:before {
        content: "";
        display: table;
    }
    &:after {
        content: "";
        display: table;
        clear: both;
    }
`

const Primary = styled.div`
    padding: 0;
    margin: 0;
    display: block;
    position: relative;
    float: left;
    width: 100%;
    &:before {
        content: "";
        display: table;
    }
    &:after {
        content: "";
        display: table;
        clear: both;
    }
`

const Main = styled.main`
    &:before {
        content: "";
        display: table;
    }
    &:after {
        content: "";
        display: table;
        clear: both;
    }
`

const Header = styled.header`
    margin-top: 0;
    margin-bottom: 0;
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
    padding-right: 20px;
    word-wrap: break-word;
`

const EntryContent = styled.div`
    word-wrap: break-word;
    &:before {
        content: "";
        display: table;
    }
    &:after {
        content: "";
        display: table;
        clear: both;
    }  
`

const Hyphen = styled.div`
    hyphens: manual;    
`

const Inner = styled.div`    
`

const SectionWrap = styled.div`
`

const Content = () => {
    return (
        <div>
            <Container>
                <Primary>
                    <Main>
                        <article>
                            <Header/>
                            <EntryContent>
                                <GlobalStyle />
                                <Hyphen className="borderbox">
                                    <Inner>
                                        <SectionWrap>
                                            <SloganSection />
                                            <CardsSection />
                                            {/* <TeamSection /> */}
                                            <ServiceSection />
                                        </SectionWrap>
                                    </Inner>
                                </Hyphen>
                            </EntryContent>
                        </article>
                    </Main>
                </Primary>
            </Container>
        </div>
    );
}




export default Content