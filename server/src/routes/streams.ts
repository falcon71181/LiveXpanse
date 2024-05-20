import { Router } from "express";
import { getIngress, getStream, getStreamByUserId } from "../controllers/streams.controllers";
import { isAuth } from "../middlewares/authReq";

const router = Router();

router.use(isAuth);
router.get('/me', getStream);
router.get('/ingress', getIngress);
router.get('/:userId', getStreamByUserId);

export { router as stream_routes };
