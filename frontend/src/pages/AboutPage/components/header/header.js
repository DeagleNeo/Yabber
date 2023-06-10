import styled from "styled-components"
import logo from "../../../../assets/yabber_logo.png"

const Headerwrapper = styled.div`
    z-index: 99;
    position: relative;

    &:before {
        content: "";
        display: table;
    }

    &:after {
        clear: both;
        content: "";
        display: table;
    }
`

const Desktop = styled.div`
    @media (max-width: 1150px) {
        display: none;
    }
`

const MainHeaderWrapper = styled.div`
    position: relative;    
`

const DesktopHeaderWrapper = styled.div`
    padding-top: 1.2em;
    padding-bottom: 1.2em;
    display: block;
    background-color: #680a83;
    background-image: none;
    z-index: 4;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    border-bottom-color: #eaeaea;
    border-bottom-style: none;
    border-bottom-width: inherit;
    
    @media (max-width: 1150px) {
        padding-top: 1.2em;
        padding-bottom: 1.2em;
        display: grid;
        line-height: 3;
        border: 0;
    }
    @media (max-width: 544px) {
        padding-top: 1em;
        padding-bottom: 1em;
        display: grid;
        line-height: 3;
        border: 0;
    }
`

const HeaderRow = styled.div`
    min-height: 70px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 100%;
    @media (min-width: 544px) {
      max-width: 100%;
    }
    @media (min-width: 1151px) {
      max-width: 1240px;
    }
    

    &:before {
        content: "";
        display: table;
    }

    &:after {
        clear: both;
        content: "";
        display: table;
    }
`

const HeaderBar = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    grid-column-gap: 20px;
    overflow-wrap: anywhere;
`

const LogoSection = styled.div`
    flex-wrap: nowrap;
    display: flex;
    height: 100%;
    min-height: 0;
    align-items: center;
`

const MenuSection = styled.div`
    flex-wrap: nowrap;
    display: flex;
    justify-content: flex-end;
    height: 100%;
    min-height: 0;
    align-items: center;
`

const LogoWrapper = styled.div`
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`

const LogoRow = styled.div`
    padding: 1em 0;
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    transition: all .2s linear;
    line-height: 1;
    align-self: center;
    @media (max-width: 1150px) {
        flex: 1;
        width: 100%;
    }
`

const Logo = styled.span`
    padding-right: 1em;
`
const LogoImg = styled.img`
    max-width: 225px;
    transition: all 0.2s linear;
    width: 225px;
    @media (max-width: 544px) {
        max-width: 180px;
        width: 180px;
    }
`

const NavWrapper = styled.div`
    align-items: center;
    display: flex;
    font-family: inherit;
    font-weight: inherit;
    flex-wrap: wrap;
    padding: 0 10px 0 0;
    @media (max-width: 1150px) {
        width: 100%;
    }
`

const Toolbar = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 0 10px;
`

const NavbarAlign = styled.div`
    height: 100%;
    margin-left: auto;
    @media (max-width: 1150px) {
        display: block;
        width: 100%;
        flex: auto;
        order: 4;
    }
`

const Navbar = styled.div`
    height: 100%;
    @media (max-width: 1150px) {
        line-height: 3;
        width: 100%;
        margin: 0;
        flex: auto;
    }
`

const Nav = styled.nav`
    flex-grow: 1;
    height: 100%;
    display: block;
`

const NavContent = styled.nav`
    padding: 0;
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    align-content: center;
    height: 100%;
    @media (max-width: 1150px) {
        display: block;
        width: 100%;
    }
`

const NavList = styled.ul`
    align-self: center;
    list-style: none;
    margin: 0;
    padding-left: 0;
    position: relative;
    display: flex;
    flex-wrap: wrap;
`

const NavItem = styled.li`
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    @media (max-width: 1150px) {
        width: 100%;
    }
`

const NavLink = styled.a`
    height: 100%;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: flex;
    color: rgba(255,255,255,0.95);
    text-decoration: none;
    padding: 0 1em;
    transition: all .2s linear;
    &:hover {
      color: rgba(255,255,255,0.95);
    }
    @media (max-width: 1150px) {
        padding-top: 0px;
        padding-bottom: 0px;
        padding-left: 20px;
        padding-right: 20px;
        display: inline-block;
        width: 100%;
        height: 100%;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: flex;
        border: 0;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: #eaeaea;
        color: #680a83;
        background: rgba(225,215,249,0.4)
    }
`

const Span1 = styled.span`
    margin-right: 5px;
    transition: none;
`

const Span2 = styled.span`
    transition: none;
`

const Span3 = styled.span`
    transition: none;    
`

const GetStartContent = styled.div`
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 28px;
    padding-right: 28px;
    text-transform: uppercase;
    font-size: 15px;
    box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 10%);
    color: #680a83;
    background: #f0ecf9;
    border-radius: 50px;
    border-style: solid;
    border-top-width: 0;
    border-right-width: 0;
    border-left-width: 0;
    border-bottom-width: 0;
    font-family: inherit;
    font-weight: normal;
    line-height: 1;
    letter-spacing: 1px;
    &:hover {
        color: #680a83;
        background: #ffffff;
        border-color: #ed003f;
    }
`

const Mobile = styled.div`
    @media (min-width: 1150px){
        display: none;
    }
`

const MobileHeaderWrapper = styled.div`
    padding-top: 1.2em;
    padding-bottom: 1.2em;
    min-height: 70px;
    display: block;
    background-color: #680a83;
    background-image: none;
    z-index: 4;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    border-bottom-color: #eaeaea;
    border-bottom-style: none;
    border-bottom-width: inherit;

    @media (max-width: 1150px) {
        padding-left: 20px;
        padding-right: 20px;
        display: grid;
        border-bottom-style: none;
        line-height: 3;
        border-bottom-color: #eaeaea;
        border: 0;
    }

    @media (max-width: 544px) {
        padding-top: 1em;
        padding-bottom: 1em;
    }
`

const MobileToolbar = styled.div`
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`

const ButtonWrap = styled.div`
    display: inline-block;
`

const Toggle = styled.button`
    display: flex;
    align-items: center;
    width: auto;
    height: auto;
    color: #ffffff;
    border: none;
    background: #f32a46;
    border-radius: inherit;
    padding: 0.5em;
    text-align: center;
    font-size: 1.5em;
    font-weight: 400;
    vertical-align: middle;
    line-height: 1.85714285714286;
    box-shadow: none;
    &:focus {
        outline: thin dotted;
    }
    
`

const ToggleIcon = styled.span`
    display: inline-flex;
    align-self: center;

`
const ToggleSvg = styled.svg`
    width: 20px;
    height: 20px;
    fill: #ffffff;
    transition: none;
    overflow: hidden;
`

const Path = styled.path`
    transition: none;
`

const Header = () => {
    return (
      <Headerwrapper>
        <Desktop>
          <MainHeaderWrapper>
            <DesktopHeaderWrapper>
              <HeaderRow>
                <HeaderBar>
                  <LogoSection>
                    <LogoWrapper>
                      <LogoRow>
                        <Logo>
                          <a href="/about">
                            {/* ## Change the Logo src link here */}
                            <LogoImg
                              xmlns="http://www.w3.org/2000/svg"
                              width="271"
                              height="54"
                              src={logo}
                              alt="Logo"
                            />
                          </a>
                        </Logo>
                      </LogoRow>
                    </LogoWrapper>
                  </LogoSection>
                  <MenuSection>
                    <NavWrapper>
                      <NavbarAlign>
                        <Navbar>
                          <Nav>
                            <NavContent>
                              <NavList>
                                {/* ## Change NavItem and NavLink here if needed  */}
                                <NavItem>
                                  <NavLink>
                                    <Span1 />
                                    <Span2>Widgets</Span2>
                                    <Span3 />
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="https://ultimateelementor.com/elementor-templates/">
                                    <Span1 />
                                    <Span2>Elementor Templates</Span2>
                                    <Span3 />
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="https://ultimateelementor.com/section-blocks/">
                                    <Span1 />
                                    <Span2>Section Blocks</Span2>
                                    <Span3 />
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="/pricing/">
                                    <Span1 />
                                    <Span2>Pricing</Span2>
                                    <Span3 />
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink href="#">
                                    <Span1 />
                                    <Span2>Help Center</Span2>
                                    <Span3 />
                                  </NavLink>
                                </NavItem>
                              </NavList>
                            </NavContent>
                          </Nav>
                        </Navbar>
                      </NavbarAlign>
                    </NavWrapper>
                    <Toolbar>
                      <div>
                        <a href="/pricing/" target="_self">
                          <GetStartContent>Get Started</GetStartContent>
                        </a>
                      </div>
                    </Toolbar>
                  </MenuSection>
                </HeaderBar>
              </HeaderRow>
            </DesktopHeaderWrapper>
          </MainHeaderWrapper>
        </Desktop>
        <Mobile>
          <MainHeaderWrapper>
            <MobileHeaderWrapper>
            <HeaderBar>
                <LogoSection>
                    <LogoWrapper>
                        <LogoRow>
                        <Logo>
                            <a href="/about">
                            {/* ## Change the Logo src link here */}
                            <LogoImg
                                width="271"
                                height="54"
                                src={logo}
                                alt="Logo"
                            />
                            </a>
                        </Logo>
                        </LogoRow>
                    </LogoWrapper>
                </LogoSection>
                <MenuSection>
                    <MobileToolbar>
                        <ButtonWrap>
                            <Toggle>
                                <ToggleIcon>
                                    <ToggleSvg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <Path d="M3 13h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 7h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 19h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></Path>
                                    </ToggleSvg>
                                </ToggleIcon>
                            </Toggle>
                        </ButtonWrap>
                    </MobileToolbar>
                </MenuSection>
            </HeaderBar>
            </MobileHeaderWrapper>
          </MainHeaderWrapper>
        </Mobile>
      </Headerwrapper>
    );
}




export default Header