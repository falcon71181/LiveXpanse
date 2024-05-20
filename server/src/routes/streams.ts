import { Router } from "express";
import { getIngress, getSpecificStream, getStream, getStreamByUserId } from "../controllers/streams.controllers";
import { isAuth } from "../middlewares/authReq";

const router = Router();

router.use(isAuth);
router.get('/me', getStream);
router.get('/:streamId', getSpecificStream);
router.get('/ingress', getIngress);
// router.get('/:userId', getStreamByUserId);

export { router as stream_routes };
