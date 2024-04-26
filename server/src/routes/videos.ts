import { Router } from "express";
import {
    getPerticularVideoMetadata,
    getVideoStream,
    getVideosMetadata
} from "../controllers/videos.controllers";

const router = Router();

router.get('/', getVideosMetadata);
router.get('/:id/metadata', getPerticularVideoMetadata);
router.get('/:id', getVideoStream);

export { router as videos_routes };
