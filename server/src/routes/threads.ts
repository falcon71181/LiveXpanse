import { Router } from "express";
import {
  getThreadInfo,
  getThreads,
  createThread,
} from "../controllers/thread.controller";
import { createReply, createSubReply } from "../controllers/reply.controller";
import { isAuth } from "../middlewares/authReq";
import type { IRouter } from "express";

const router: IRouter = Router();

// get all threads
router.get("/", getThreads);

// threads/create
router.post("/create", isAuth, createThread);

// threads/:id
router.get("/:thread_Id", getThreadInfo);

// threads/:thread_Id/replies
router.post("/:threadId/replies", isAuth, createReply);

// threads/:thread_Id/replies/:parentId/replies
router.post("/:threadId/replies/:parentId/replies", isAuth, createSubReply);

export { router as thread_routes };
