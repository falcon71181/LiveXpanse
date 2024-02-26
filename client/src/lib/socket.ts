import io from "socket.io-client";

// importing env sercer
const SERVER = import.meta.env.VITE_SERVER ?? "http://localhost:3333";
console.log(SERVER);

export const socket = io(SERVER);
