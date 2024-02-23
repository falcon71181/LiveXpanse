import { Router } from "express";
import type { IRouter } from "express";
import { registerUser } from "../controllers/auth.controller";

const router: IRouter = Router();

// /users/register
router.post("/register", registerUser);

// exporting as user_routes
export { router as user_routes };
