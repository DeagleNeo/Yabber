import React from "react";
import { io } from "socket.io-client";
import { useState, useRef, useEffect } from "react";

const socketInstance = io(process.env.REACT_APP_SERVER_ADD, {
  transports: ["websocket"],
});

const SocketContext = React.createContext();

const SocketContextProvider = ({ children }) => {
  const [reloadGroup, setReloadGroup] = useState(false);
  const [reloadChat, setReloadChat] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [reaction, setReaction] = useState({});
  const socket = useRef(socketInstance);

  const currentUser = JSON.parse(
    sessionStorage.getItem("currentUser") || localStorage.getItem("currentUser")
  );
  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("newGroup", () => {
      setReloadGroup(true);
    });
    socket.current.on("newChat", () => setReloadChat(true));
    socket.current.on("onlineUsers", (list) => {
      setOnlineUsers(list);
    });
    socket.current.on("reaction", ({ data }) => {
      setReaction(data);
    });
    return () => {
      socketInstance.off("newGroup");
      socketInstance.off("newChat");
      socketInstance.off("onlineUsers");
      socketInstance.off("reaction");
    };
  }, [currentUser._id]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        currentUser,
        reloadGroup,
        reloadChat,
        setReloadGroup,
        setReloadChat,
        onlineUsers,
        reaction,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider };
