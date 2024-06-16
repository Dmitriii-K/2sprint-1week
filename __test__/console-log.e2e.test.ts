import { req } from "./test-helpers";
import { SETTINGS } from "../src/settings";
import { blogCollection, connectDB } from "../src/db/mongo-db";
import {
  BlogInputModel,
  BlogDbType,
} from "../src/input-output-types/blogs-type";
import { authMiddleware, codedAuth } from "../src/middlewares/middlewareForAll";
import { ObjectId } from "mongodb";

describe("/blogs", () => {
  beforeAll(async () => {
    await connectDB();
  });

  const blogId = new ObjectId();
  const createDate = new Date().toISOString();

  it("should create", async () => {
    await blogCollection.drop();
    const newBlog: BlogInputModel = {
      name: "string",
      description: "string",
      websiteUrl: "https://YUISbofyirb6dFmevNl151zv",
    };

    const res = await req
      .post(SETTINGS.PATH.BLOGS)
      .set({ Authorization: "Basic " + codedAuth })
      .send(newBlog) // отправка данных
      .expect(201);

    // console.log(res.body)

    expect(res.body.name).toEqual(newBlog.name);
    expect(res.body.description).toEqual(newBlog.description);
    expect(res.body.websiteUrl).toEqual(newBlog.websiteUrl);
    expect(typeof res.body.id).toEqual("string");

    expect(res.body).toEqual(blogCollection);
  });
});
