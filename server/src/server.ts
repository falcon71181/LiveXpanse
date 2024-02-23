import { config } from "dotenv";
import express from "express";
import { user_routes } from "./routes/users";

// to read DotEnv file variables
config();

// port for server
const SERVER_PORT = process.env.SERVER_PORT || 3333;

const app = express();

// Health Check API Route
app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

// User Login & Register routes
app.use("/users", user_routes);

// Starting Server with SERVER_PORT
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on : ${SERVER_PORT}`);
});

// Exporting app for Vercel API
export default app;
