import styled from "styled-components";
import Logo from "./components/Logo/Logo";
// import SearchBar from "./components/SearchBar";
import Toggle from "./components/Toggle/Toggle";
// import UserMenu from "./components/UserMenu/UserMenu";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const HeaderWrapper = styled.div`
  background-color: #fdfdfd;
  box-shadow: 0 0 2px rgb(0 0 0 / 10%);
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  /* z-index: 1001; */
  height: 60px;
  display: flex;
  align-items: enter;
  justify-content: space-between;
`;

const HeaderStart = styled.div`
  display: flex;
`;

const Button = styled.button`
  margin: 20px 30px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  align-self: flex-start;
  color: #939393;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  :hover{
    color: #757575;
  }
`;

const Header = ({sidebarDrawer, setSidebarDrawer}) => {
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <HeaderStart>
        <Logo sidebarDrawer={sidebarDrawer} />
        <Toggle setSidebarDrawer={setSidebarDrawer} />
        {/* <SearchBar /> */}
      </HeaderStart>
      {/* <UserMenu /> */}
      <Button onClick={() => navigate("/main")}>
        <ArrowBackIosNewIcon sx={{ color: '#939393', width: '12px' }} />
        Back to Chat
      </Button>
    </HeaderWrapper>
  );
};

export default Header;
