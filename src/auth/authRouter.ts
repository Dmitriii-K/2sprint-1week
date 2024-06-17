import { Router } from "express";
import { checkAuth } from "./authController";

export const authRouter = Router();

authRouter.post("/login", checkAuth);
