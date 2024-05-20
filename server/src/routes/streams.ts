import { Router } from "express";
import { createViewerToken, getIngress, getStream, getStreamByUsername } from "../controllers/streams.controllers";
import { isAuth } from "../middlewares/authReq";

const router = Router();

router.get('/me', isAuth, getStream);
router.get('/ingress', isAuth, getIngress);
router.get('/:username', getStreamByUsername);
router.post('/viewer-token', createViewerToken);

export { router as stream_routes };
