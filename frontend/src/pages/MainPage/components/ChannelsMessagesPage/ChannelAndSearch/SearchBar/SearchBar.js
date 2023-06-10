import styled from "styled-components";
import { useContext } from "react";
import ClickProfileContext from "../../../../../../components/ClickProfile/ClickProfileContext";
import { getUserInfo } from "../../../../../../api/api";
import IconButton from "@mui/material/IconButton";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import SearchIcon from "@mui/icons-material/Search";
// import PhoneIcon from "@mui/icons-material/Phone";
// import VideocamIcon from "@mui/icons-material/Videocam";
// import PersonIcon from "@mui/icons-material/Person";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import Tooltip from "@mui/material/Tooltip";
import { Avatar } from "@mui/material";
import {
  getInitialLetter,
  stringToColor,
} from "../../../../../../utils/letterAvatar";


// const SearchBarStyle = styled.div`
//   width: 40%;
//   max-width: 230px;
//   box-sizing: border-box;
//   display: block;
//   font-size: 14px;
// `;
const BarIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin: 0 0.5rem;
`;

// const StyledIconButton = {
//   color: "#C8C8D8",
//   backgroundColor: "#F4F4FA",
//   fontSize: 20,
//   "&:hover": {
//     color: "#f4f4fa",
//     backgroundColor: "#5a078b",
//   },
// };

// const EachIcon = styled.div`
//   margin-left: 5px;
//   width: 40px;
//   height: 40px;
//   background-color: #f4f4fa;
//   border-radius: 45%;
//   display: block;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   :hover {
//     background-color: #5a078b;
//     cursor: pointer;
//   }
//   :hover i {
//     color: #f4f4fa;
//   }
// `;StyledIconButton

const SearchBar = () => {
  const ClickProfile = useContext(ClickProfileContext);
  const { firstName, lastName, avatar } = ClickProfile.currentUser;
  const onClickHandler = (e) => {
    ClickProfile.setTab("CHAT");

    getUserInfo(ClickProfile.currentUser._id).then(async (response) => {
      ClickProfile.setUserInfo(await response.data.data.user);
    });

    ClickProfile.setIsDrawerOpen(true);
  };
  return (
    // <SearchBarStyle>
      <BarIcons>
        {/* <IconButton fontSize="small" sx={StyledIconButton}>
          <SearchIcon />
        </IconButton>
        <IconButton sx={StyledIconButton} onClick={()=>{ClickProfile.setIsSideBarOpen(false)}}>
          <PhoneIcon />
        </IconButton> */}
        <IconButton onClick={onClickHandler}>
        <Avatar
        alt={firstName}
        src={avatar}
        
        sx={{ bgcolor: stringToColor(firstName), 
          // [theme.breakpoints.down(800)]:{
          //   width: 70, height: 70
          // },
          
          width: 50, height: 50 }}
      >
        {getInitialLetter(firstName + " " + lastName)}
      </Avatar>
        </IconButton>

        {/* <Tooltip title="view personal profile">
          <IconButton sx={StyledIconButton} onClick={onClickHandler}>
            <PersonIcon />
          </IconButton>
        </Tooltip> */}
        {/* <IconButton>
          <MoreHorizIcon />
        </IconButton> */}
      </BarIcons>
    // </SearchBarStyle>
  );
};

export default SearchBar;
