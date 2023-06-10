import { useRef, useState } from "react"
import MultiChannelContext from "./MultiChannelContext";

const MultiChannel = ({children}) => {
  const currentChannel = useRef({ _id: "", name: "", avatar: "" });
  const [lastMessage, setLastMessage] = useState({});
  const [initChannel, setInitChannel] = useState(false);

  return (
    <MultiChannelContext.Provider
      value={{
        currentChannel,
        lastMessage,
        setLastMessage,
        initChannel,
        setInitChannel,
      }}
    >
      {children}
    </MultiChannelContext.Provider>
  )
}

export default MultiChannel;