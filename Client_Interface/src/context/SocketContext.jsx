// context for socket.io
// Path: src/context/SocketContext.jsx

import  { createContext } from "react";
import socket from "@/socket";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
