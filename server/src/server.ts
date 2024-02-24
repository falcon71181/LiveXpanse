import { config } from "dotenv";
import cors from "cors";
import express from "express";
import { user_routes } from "./routes/users";
import { Server } from "socket.io";
import { createServer } from "http";

// to read DotEnv file variables
config();

// port for server
const SERVER_PORT = process.env.SERVER_PORT || 3333;
// port of client app
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;

const app = express();
const httpServer = createServer(app);

// Create an instance of the Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: [`http://localhost:${CLIENT_PORT}`],
  },
});

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check API Route
app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

// User Login & Register routes
app.use("/users", user_routes);

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log(socket.id, "connected");

  socket.on("message", (messageData) => {
    io.emit("message", messageData);
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "left");
  });
});

// Starting Server with SERVER_PORT
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on : ${SERVER_PORT}`);
});

// Exporting app for Vercel API
export default app;
