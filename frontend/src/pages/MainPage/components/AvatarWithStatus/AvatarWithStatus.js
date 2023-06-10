import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import {
  stringToColor,
} from "../../../../utils/letterAvatar";

const AvatarWithStatus = ({ name, avatar, status, children }) => {
  const statusColor = status === true ? "#44b700" : "#aaaaaa";

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: statusColor,
      color: statusColor,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation:
          statusColor === "#44b700" ? "ripple 1.2s infinite ease-in-out" : null,
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const style = {
    bgcolor: stringToColor(name),
    width: 35,
    height: 35,
    fontSize: 18,
  };

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar alt={name} src={avatar} sx={style}>
        {children}
      </Avatar>
    </StyledBadge>
  );
};


export default AvatarWithStatus;
