import { Router } from "express";
import { createThread } from "../controllers/thread.controller";
import { isAuth } from "../middlewares/authReq";
import type { IRouter } from "express";

const router: IRouter = Router();

// threads/create
router.post("/create", isAuth, createThread);

export { router as thread_routes };
