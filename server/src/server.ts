import * as dotenv from "dotenv";
// to read DotEnv file variables
dotenv.config();

import cors from "cors";
import express from "express";
import { user_routes } from "./routes/users";
import { thread_routes } from "./routes/threads";
import { Server } from "socket.io";
import { createServer } from "http";

// port for server
const SERVER_PORT = process.env.SERVER_PORT || 3333;
// port of client app
const CLIENT_PORT = process.env.CLIENT_PORT || 5173;

const app = express();
const httpServer = createServer(app);

// Create an instance of the Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: [
      `http://localhost:${CLIENT_PORT}`,
      "http://localhost:3000",
      "http://localhost:8000",
      "http://localhost:5173",
    ],
  },
});

// CORS Options
const corsOptions = {
  origin: (process.env?.ALLOWED_ORIGIN || "http://localhost:3333").split(","),
  methods: (process.env?.ALLOWED_METHODS || "GET", "POST").split(","),
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Health Check API Route
app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

// User Login & Register routes
app.use("/users", user_routes);

// Thread create routes
app.use("/threads", thread_routes);

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("sent-message", (messageData) => {
    io.emit("received-message", messageData);
  });

  socket.on("disconnect", () => {
    console.log(`🔥: ${socket.id} user just disconnected`);
  });
});

// Starting Server with SERVER_PORT
httpServer.listen(SERVER_PORT, () => {
  console.log(`Server is running on : ${SERVER_PORT}`);
});

// Exporting app for Vercel API
export default app;
