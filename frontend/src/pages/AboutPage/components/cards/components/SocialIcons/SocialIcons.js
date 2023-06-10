import styled from "styled-components"
// import { useState } from "react";
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import Typography from '@mui/material/Typography';
import StyledLink from "../StyledLink"
import { useSnackbar } from 'notistack';

const SocialIcon = styled.div`
    margin-top: 5px;
`

// const CopyButton = styled.button`
//   display: inline-block;
// `

const SocialIcons = ({ linkedInLink, emailLink, facebookLink }) => {
    // const [open, setOpen] = useState(false);
    // const [isCopied, setIsCopied] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleOpen = async () => {
        await navigator.clipboard.writeText(`${emailLink}`);
        enqueueSnackbar('Email copied to clipboard.', { variant: 'info', autoHideDuration: 3000 });
    }
    // setOpen(true);
    // setIsCopied(false);
    // const handleClose = () => setOpen(false);
  
    // const copy = async (event) => {
    //   await navigator.clipboard.writeText(`${emailLink}`);
    //   setIsCopied(true);
    // }
  
    return (
        <SocialIcon>
          <StyledLink
            className="fa-brands fa-linkedin-in"
            href={linkedInLink}
            target="_blank"
          ></StyledLink>
          <StyledLink
            className="fa-brands fa-facebook-f"
            href={facebookLink}
            target="_blank"
          ></StyledLink>
          <StyledLink
            className="fa-solid fa-envelope"
            onClick={handleOpen}
          ></StyledLink>
        </SocialIcon>
    );
  }
  
  export default SocialIcons