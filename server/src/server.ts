import { config } from "dotenv";
import express from "express";

config();

// port for server
const SERVER_PORT = process.env.SERVER_PORT || 3333;

const app = express();

// Health Check API Route
app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on : ${SERVER_PORT}`);
});
