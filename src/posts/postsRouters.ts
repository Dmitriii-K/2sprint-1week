import { Router, Response, Request, NextFunction } from "express";
import { getPostsController } from "./getPostsController";
import { createPostController } from "./createPostController";
import { findPostController } from "./findPostController";
import { updatePostController } from "./updatePostController";
import { deletePostController } from "./deletePostController";
import {
  postInputValidation,
  inputCheckErrorsMiddleware,
  authMiddleware,
} from "../middlewares/middlewareForAll";

export const postRouter = Router();

postRouter.get("/", getPostsController);
postRouter.post(
  "/",
  authMiddleware,
  postInputValidation,
  inputCheckErrorsMiddleware,
  createPostController
);
postRouter.get("/:id", findPostController);
postRouter.put(
  "/:id",
  authMiddleware,
  postInputValidation,
  inputCheckErrorsMiddleware,
  updatePostController
);
postRouter.delete("/:id", authMiddleware, deletePostController);
