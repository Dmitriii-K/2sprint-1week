import express from "express";
import cors from "cors";
import { SETTINGS } from "./settings";
import { deleteRouter } from "./deleteAllData";
import { blogRouter } from "./blogs/blogRouters";
import { postRouter } from "./posts/postsRouters";

export const app = express();
app.use(express.json());
app.use(cors());

app.use(SETTINGS.PATH.BLOGS, blogRouter);
app.use(SETTINGS.PATH.POSTS, postRouter);
app.use(SETTINGS.PATH.TESTING, deleteRouter);
