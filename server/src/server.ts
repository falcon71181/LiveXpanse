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

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (messageData) => {
    io.emit("message", messageData);
  });

  socket.on('disconnect', () => {

    console.log('🔥: A user disconnected');

  });
});

// Starting Server with SERVER_PORT
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on : ${SERVER_PORT}`);
});

// Exporting app for Vercel API
export default app;
