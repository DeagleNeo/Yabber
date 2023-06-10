import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MultiChannelContext } from "../../../../../components/MultiChannel";
import IconButton from "@mui/material/IconButton";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import Picker from "emoji-picker-react";
import ClickAwayListener from "react-click-away-listener";
import GifIcon from "@mui/icons-material/Gif";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import useDebounce from "react-use/lib/useDebounce";

const InputBoxStyle = styled.div`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  padding: 10px 0px 15px;
  /* background-color: #ffffff; */
  color: #212529;
  display: flex;
  width: 95%;
  /* box-shadow: 0 -3px 20px rgb(0 0 0 / 5%); */
`;

const FormStyle = styled.form`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const IconButtonStyle = {
  color: "#5A078B",
};

const InsertButtonStyle = styled.div`
  right: inherit;
  left: 20px;
  position: absolute;
  box-sizing: border-box;
`;
const GifButtonStyle = styled.div`
  right: inherit;
  left: 60px;
  position: absolute;
  box-sizing: border-box;
`;
// const AttachButtonStyle = styled.div`
//   right: inherit;
//   left: 60px;
//   position: absolute;
//   box-sizing: border-box;
// `;
// const MicButtonStyle = styled.div`
//   left: inherit;
//   right: 60px;
//   position: absolute;
//   box-sizing: border-box;
// `;
const SendButtonStyle = styled.div`
  background-color: #ee00ab;
  width: 35px;
  height: 35px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  box-sizing: border-box;
  border-radius: 50%;
`;
const InputStyle = styled.input`
  display: block;
  width: 100%;
  border-radius: 20px;
  margin-left: 10px;
  margin-right: 10px;
  background: #ffffff;
  border: 1px solid #f4eeff;
  box-shadow: 0px 4px 4px #f5f8ff;
  border-radius: 175px;
  height: 60px;
  padding: 10px 60px 10px 110px;
  font-size: 14px;
  :focus {
    outline: #5a078b solid 1px;
  }
`;

const EmojiPanel = styled.div`
  position: absolute;
  bottom: 85px;
`;
const GifPanel = styled.div`
  position: absolute;
  bottom: 85px;
  background: #ffffff;
  border: 1px solid #f4eeff;
  border-radius: 6px;
  box-shadow: 0px 4px 4px #f5f8ff;
`;

const GifChosenPanel = styled.div`
  overflow: scroll;
  height: 300px;
  margin-left: 10px;
`;

const GifSearch = styled.input`
  padding: 8px 10px;
  margin: 10px;
  width: 280px;
  border: 1px solid #bebebe;
  border-radius: 4px;
  :focus {
    outline: none;
  }
`;

const InputBox = ({ socket, currentUser }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showGifPanel, setShowGifPanel] = useState(false);
  // const [chosenGif, setChosenGif] = useState(null);
  const [debouncedInput, setDebouncedInput] = useState("");
  const [term, setTerm] = useState("");

  const gf = new GiphyFetch(process.env.REACT_APP_GIF_API_KEY);
  useDebounce(() => setTerm(debouncedInput), 500, [debouncedInput]);
  const fetchTrendingGifs = (offset) => gf.trending({ offset, limit: 20 });
  const fetchGifs = (offset) =>
    gf.search(term, { sort: "relevant", lang: "en", offset, limit: 20 });

  const multiChannel = useContext(MultiChannelContext);

  const handleSendMsg = (msg, currentUser, type, imageUrl) => {
    multiChannel.currentChannel.current._id &&
      socket.current.emit("sendMsg", {
        sender: currentUser._id,
        receiver: multiChannel.currentChannel.current._id,
        content: msg,
        msgType: type,
        reaction: [],
        imageUrl: imageUrl,
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSendMsg(msg, currentUser, "text");
    setMsg("");
  };

  const handleChangeMsg = (event) => {
    setMsg(event.target.value);
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const onGifClick = (gif, event) => {
    event.preventDefault();
    // setChosenGif(gif.images.downsized.url);
    handleSendMsg("[image]", currentUser, "image", gif.images.downsized.url);
    setShowGifPanel(false);
  };

  const toggleEmojiPanel = () => {
    setShowEmojiPanel((currentState) => !currentState);
  };

  const toggleGifPanel = () => {
    setShowGifPanel((currentState) => !currentState);
  };

  const handleClickAway = () => {
    setShowEmojiPanel(false);
    setShowGifPanel(false);
    setDebouncedInput("");
  };

  useEffect(() => {
    if (chosenEmoji) {
      setMsg((currentInput) => currentInput + chosenEmoji.emoji);
    }
  }, [chosenEmoji]);

  // useEffect(() => {
  //   if (chosenGif) {
  //     setMsg((currentInput) => currentInput + chosenGif);
  //   }
  // }, [chosenGif]);

  return (
    <InputBoxStyle>
      {showEmojiPanel && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <EmojiPanel>
            <Picker onEmojiClick={onEmojiClick} />
          </EmojiPanel>
        </ClickAwayListener>
      )}
      {showGifPanel && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <GifPanel>
            <GifSearch
              type="text"
              placeholder="Search Gifs..."
              value={debouncedInput}
              onChange={({ target: { value } }) => setDebouncedInput(value)}
            />
            <GifChosenPanel>
              {term ? (
                <Grid
                  width={280}
                  columns={3}
                  key={term}
                  fetchGifs={fetchGifs}
                  onGifClick={onGifClick}
                  hideAttribution="true"
                  noResultsMessage={<div>No results</div>}
                />
              ) : (
                <Grid
                  width={280}
                  columns={3}
                  fetchGifs={fetchTrendingGifs}
                  onGifClick={onGifClick}
                  hideAttribution="true"
                />
              )}
            </GifChosenPanel>
          </GifPanel>
        </ClickAwayListener>
      )}
      <FormStyle onSubmit={handleSubmit}>
        <InsertButtonStyle>
          <IconButton
            sx={IconButtonStyle}
            onClick={toggleEmojiPanel}
            size="large"
          >
            <InsertEmoticonIcon />
          </IconButton>
        </InsertButtonStyle>
        <GifButtonStyle>
          <IconButton
            sx={IconButtonStyle}
            onClick={toggleGifPanel}
            size="small"
          >
            <GifIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </GifButtonStyle>
        {/*<AttachButtonStyle>
          <IconButton sx={IconButtonStyle}>
            <AttachFileIcon />
          </IconButton>
        </AttachButtonStyle> */}
        {/* <MicButtonStyle>
          <IconButton sx={IconButtonStyle}>
            <MicIcon />
          </IconButton>
        </MicButtonStyle> */}
        <SendButtonStyle>
          <IconButton type="submit" sx={{ color: "white" }}>
            <SendIcon />
          </IconButton>
        </SendButtonStyle>
        <InputStyle
          type="text"
          id="inputBox"
          placeholder="Enter Message ..."
          value={msg}
          onChange={handleChangeMsg}
        />
      </FormStyle>
    </InputBoxStyle>
  );
};

export default InputBox;
