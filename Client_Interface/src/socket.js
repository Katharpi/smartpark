import { io } from "socket.io-client";

// Replace with your socket server URL
const SOCKET_SERVER_URL = "http://127.0.0.1:5000";

const socket = io(SOCKET_SERVER_URL, {
  transports: ['websocket'],
  upgrade: false,
});

export default socket;
