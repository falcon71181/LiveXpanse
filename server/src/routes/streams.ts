import { Router } from "express";
import { getStream, getStreamByUserId } from "../controllers/streams.controllers";
import { isAuth } from "../middlewares/authReq";

const router = Router();

router.get('/me', isAuth, getStream);
router.get('/:userId', isAuth, getStreamByUserId);

export { router as stream_routes };
