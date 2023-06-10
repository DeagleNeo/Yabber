import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
// import Header from './components/header'
import Content from './components/content'
import {SnackbarProvider} from "notistack"
import ScrollTop from "./components/Scroll"
import { useState } from 'react';
import MenuModal from "./components/MenuModal"
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const GlobalStyle = createGlobalStyle`
    *, :after, :before {
        box-sizing: inherit;
    }

    ::selection {
        background-color: #5124b3;
        color: #ffffff;
    }

    a:focus {
        outline: none;
    }

    a:hover, a:active {
        outline: 0;
    }

    a, a:focus, a:hover, a:visited {
        text-decoration: none;
    }

    a {
        transition: all .2s linear;
        background-color: transparent;
    }

    img {
        vertical-align: middle;
        height: auto;
        max-width: 100%;
        border: 0;
    }

    ul {
        border: 0;
        font-size: 100%;
        font-style: inherit;
        font-weight: inherit;
        margin: 0;
        outline: 0;
        padding: 0;
        vertical-align: baseline;
    }

    li {
        border: 0;
        font-size: 100%;
        font-style: inherit;
        font-weight: inherit;
        margin: 0;
        outline: 0;
        padding: 0;
        vertical-align: baseline;
    }
    button {
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 0;
        -webkit-appearance: button;
        cursor: pointer;
        overflow: visible;
        font: inherit;
    }
    button:active {
        outline: 0;
    }
    main, nav {
        display: block;
    }
    h1, h2, h3, h4, h5, h6 {
        clear: both;
        outline: 0;
        padding: 0;
        vertical-align: baseline;
        font-style: inherit;
        border: 0;
        color: #2a2a2a;
    }
    h1 {
        font-size: 2.6666666666667rem;
        font-weight: 700;
        font-family: ProximaNova-Bold,Helvetica,Arial,sans-serif;
        line-height: 1;
    }
    @media (max-width: 1150px) {
        h1 {
            font-size: 40px;
        }
    }
    @media (max-width: 544px) {
        h1 {
            font-size: 30px;
        }
    }
    h2 {
        font-size: 2.1111111111111rem;
        font-weight: 400;
        font-family: ProximaNova-Bold,Helvetica,Arial,sans-serif;
        line-height: 1.28;
    }
    @media (max-width: 1150px) {
        h2 {
            font-size: 32px;
        }
    }
    @media (max-width: 544px) {
        h2 {
            font-size: 25px;
        }
    }
    h4 {
        font-size: 1.2777777777778rem;
        font-family: ProximaNova-Bold,Helvetica,Arial,sans-serif;
        line-height: 1.5;
    }
    @media (max-width: 1150px) {
        h4 {
            font-size: 1.2222222222222rem;
        }
    }
    @media (max-width: 544px) {
        h4 {
            font-size: 1.1111111111111rem;
        }
    }
    li, ol, p, pre, ul {
        border: 0;
        font-size: 100%;
        font-style: inherit;
        font-weight: inherit;
        margin: 0;
        outline: 0;
        padding: 0;
        vertical-align: baseline;
    }
`

const Pagewrapper = styled.div`
    position: relative;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    background-color: #ffffff;
    color: #474e5d;
    font-family: ProximaNova-Regular,Helvetica,Arial,sans-serif;
    font-weight: 400;
    font-size: 1rem;
    font-style: normal;
    line-height: 1.62;
    vertical-align: baseline;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
`
const Page = styled.div`
    display: block;
    position: relative;
`


const AboutPage = () => {
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

    const toggleMenuModal = () => {
        setIsMenuModalOpen((prevState) => !prevState)
    }

    return (
      <SnackbarProvider maxSnack={1} variant="info" autoHideDuration={3000}>
        <GlobalStyle />
        <Pagewrapper>
          <Page>
            {/* <Header /> */}
            <MenuModal
              isMenuModalOpen={isMenuModalOpen}
              toggleMenuModal={toggleMenuModal}
            />
            <Navbar toggleMenuModal={toggleMenuModal} />
            {/* <Header /> */}
            <Content />
            <Footer />
          </Page>
          <ScrollTop />
        </Pagewrapper>
      </SnackbarProvider>
    );
}

export default AboutPage