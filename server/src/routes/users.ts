import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import { isAuth } from "../middlewares/authReq";
import type { IRouter } from "express";

const router: IRouter = Router();

// /users/login
router.post("/login", loginUser);

// /users/register
router.post("/register", registerUser);

// /users/validate
router.get("/validate", isAuth, (_req, res) => {
  res.sendStatus(200);
});

// exporting as user_routes
export { router as user_routes };
