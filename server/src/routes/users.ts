import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import type { IRouter } from "express";

const router: IRouter = Router();

// /users/login
router.post("/login", loginUser);

// /users/register
router.post("/register", registerUser);

// exporting as user_routes
export { router as user_routes };
