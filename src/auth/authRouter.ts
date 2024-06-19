import { Router } from "express";
import { checkAuthUser } from "./authController";

export const authRouter = Router();

authRouter.post("/login", checkAuthUser);
