import { Router } from "express";
import { authUser } from "./authController";
import { authCheckValidation } from "../middlewares/middlewareForAll";

export const authRouter = Router();

authRouter.post("/login", authCheckValidation, authUser);
