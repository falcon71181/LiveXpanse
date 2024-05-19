// Core packages
import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import * as dotenv from "dotenv";
dotenv.config();

// Others (routes/utils)
import { user_routes } from "./routes/users";
import { thread_routes } from "./routes/threads";
import { videos_routes } from "./routes/videos";
import { getOrigins, getMethods } from "./lib/utils";
import { stream_routes } from "./routes/streams";

const SERVER_PORT = process.env.SERVER_PORT;
const ORIGINS = getOrigins();
const METHODS = getMethods();

// Express server
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: ORIGINS,
    },
});

// Middlewares
app.use(cors({ origin: ORIGINS, methods: METHODS }));
app.use(express.json());

// Health Check API Route
app.get("/health", (_req, res) => {
    res.sendStatus(200);
});

// Other routes
app.use("/users", user_routes);
app.use("/threads", thread_routes);
app.use("/videos", videos_routes);
app.use('/streams', stream_routes);

io.on("connection", (socket) => {
    console.log(`🟢 ${socket.id} CONNECTED!`);

    socket.on("sent-message", (messageData) => {
        io.emit("received-message", messageData);
    });

    socket.on("disconnect", () => {
        console.log(`🔴 ${socket.id} DISCONNECTED`);
    });
});

httpServer.listen(SERVER_PORT, async () => {
    console.log(`Server is listening on port ${SERVER_PORT}`);
});

export default app;
