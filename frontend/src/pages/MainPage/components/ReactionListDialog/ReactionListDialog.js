import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  useState,
  useContext,
  useLayoutEffect,
  useRef,
  useEffect,
} from "react";
import ModalsContext from "../ModalsContext";
import { SocketContext } from "../SocketIoContext/SocketIoContext";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getReactionUserNames } from "../../../../api/api";
import {
  stringToColor,
  getInitialLetter,
} from "../../../../utils/letterAvatar";

const BottomTextContainer = styled.div`
  margin: auto;
  /* font-size: 1.3rem; */
  /* font-weight: 600; */
  text-align: center;
  padding: 5px 10px 10px 5px;
  color: #122c44;
`;

function ReactionListDialog() {
  const {
    reactionListDialogOpen,
    setReactionListDialogOpen,
    reactionMsgId,
    setReactionMsgId,
  } = useContext(ModalsContext);
  const { reaction } = useContext(SocketContext);

  const currentMsgId = useRef();

  const handleClose = () => {
    setReactionListDialogOpen(false);
    setReactionMsgId(null); // to force the dialog to reload next time when it opens
  };

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    const { messageId } = reaction;
    if (messageId === currentMsgId.current) {
      setReload((state) => !state);
    }
  }, [reaction]);

  useLayoutEffect(() => {
    if (reactionMsgId) {
      setLoading(true);
      getReactionUserNames(reactionMsgId).then((res) => {
        setList(res.data.data);
        setLoading(false);
        currentMsgId.current = reactionMsgId;
      });
    }
  }, [reactionMsgId, reload]);

  const titleStyle = {
    backgroundColor: "#5a078b",
    color: "white",
  };

  if (loading && currentMsgId.current !== reactionMsgId)
    return <div>Loading...</div>;

  return (
    <Dialog onClose={handleClose} open={reactionListDialogOpen}>
      <DialogTitle sx={titleStyle}>
        Reaction 👍{list.length}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "gray",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <List
        sx={{
          pt: 0,
          maxHeight: "350px",
          overflow: "auto",
        }}
      >
        {list.map(({ _id, name, avatar }) => (
          <ListItem button key={_id} sx={{ pl: 3, pr: 5, pt: 1, pb: 1 }}>
            <ListItemAvatar>
              <Avatar src={avatar} sx={{ bgcolor: stringToColor(name) }}>
                {getInitialLetter(name)}
              </Avatar>{" "}
            </ListItemAvatar>

            <ListItemText primary={name} sx={{ pl: 3 }} />
          </ListItem>
        ))}
      </List>
      <BottomTextContainer> like👍 this message</BottomTextContainer>
    </Dialog>
  );
}

export default ReactionListDialog;
