import { Router } from "express";
import { createThread } from "../controllers/thread.controller";
import { createReply } from "../controllers/reply.controller";
import { isAuth } from "../middlewares/authReq";
import type { IRouter } from "express";

const router: IRouter = Router();

// threads/create
router.post("/create", isAuth, createThread);

// threads/reply/:thread_Id
router.post("/reply/:threadId", isAuth, createReply);

export { router as thread_routes };
