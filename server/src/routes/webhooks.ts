import { Router } from "express";
import express from 'express';
import { livekitEventWebhook } from "../controllers/webhooks.controllers";

const router = Router();

router.use(express.raw({type: 'application/webhook+json'}));
router.post('/livekit', livekitEventWebhook);

export { router as webhook_routes };
