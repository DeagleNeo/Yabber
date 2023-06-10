import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import CloseIcon from '@mui/icons-material/Close';

import create from 'zustand';

const useConfirmDialogStore = create((set) => ({
    message: '',
    onSubmit: undefined,
    close: () => set({ onSubmit: undefined }),
  }));

export const confirmDialog = (title, message, onSubmit) => {
    useConfirmDialogStore.setState({
        title,
        message,
        onSubmit,
    });
};

const ConfirmDialogx = () => {
    // destructure the store data and functions
   const { title, message, onSubmit, close } = useConfirmDialogStore();
   return (
      // if the onSubmit is undefined the dialog will be closed. 
      // close() function sets the onSubmit to undefined, 
      // so it will close the dialog, if we pass it to the onClose attribute.
     <Dialog open={Boolean(onSubmit)} onClose={close} maxWidth="sm"> 
       <DialogTitle>{title}</DialogTitle>
       <Box position="absolute" top={0} right={0}>
         <IconButton onClick={close}>
           <CloseIcon />
         </IconButton>
       </Box>
       <DialogContent>
         <Typography>{message}</Typography>
       </DialogContent>
       <DialogActions>
         <Button color="primary" variant="contained" onClick={close}>
           Cancel
         </Button>
         <Button
           color="secondary"
           variant="contained"
           onClick={() => {
             if (onSubmit) {
               onSubmit();
             }
             close();
           }}
         >
           Confirm
         </Button>
       </DialogActions>
     </Dialog>
   );
 };



export default ConfirmDialogx