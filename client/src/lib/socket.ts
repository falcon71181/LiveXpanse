import { io } from 'socket.io-client';

// importing env server
const SERVER = import.meta.env.VITE_SERVER ?? "http://localhost:3333";
const socket = io(SERVER);

export default socket;
