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
    it("should create blog", async () => {
    await blogCollection.drop();

    const newBlog: BlogInputModel = {
      name: "string",
      description: "stringde",
      websiteUrl: "https://YUISbofyir.com",
    };

    const res = await req
      .post(SETTINGS.PATH.BLOGS)
      .set({ Authorization: "Basic " + codedAuth })
      .send(newBlog) // отправка данных
      .expect(201);

    console.log(res.body); // посметреть ответ эндпоинта

    expect(res.body.name).toEqual(newBlog.name);
    expect(res.body.description).toEqual(newBlog.description);
    expect(res.body.websiteUrl).toEqual(newBlog.websiteUrl);
    expect(typeof res.body.id).toEqual("string");
  });
}
);

// it("should get TESTING", async () => {
//   const res = await req.get(SETTINGS.PATH.TESTING).expect(200); // проверка наличия эндпоинта

//   console.log(res.status);
//   console.log(res.body); // посметреть ответ эндпоинта

//   expect(res.body.length).toBe(0); // проверяем ответ эндпоинта
//   expect(1).toBe(1); // проверяем ответ эндпоинта
// });
// it("should get POSTS", async () => {
//   const res = await req.get(SETTINGS.PATH.POSTS).expect(200); // проверка наличия эндпоинта

//   console.log(res.status);
//   console.log(res.body); // посметреть ответ эндпоинта

//   expect(res.body.length).toBe(0); // проверяем ответ эндпоинта
//   expect(1).toBe(1); // проверяем ответ эндпоинта
// });
// it("should get USERS", async () => {
//   const res = await req.get(SETTINGS.PATH.USERS).expect(200); // проверка наличия эндпоинта

//   console.log(res.status);
//   console.log(res.body); // посметреть ответ эндпоинта

//   expect(res.body.length).toBe(0); // проверяем ответ эндпоинта
//   expect(1).toBe(1); // проверяем ответ эндпоинта
// });
// it("should get AUTH", async () => {
//   const res = await req.get(SETTINGS.PATH.AUTH).expect(200); // проверка наличия эндпоинта

//   console.log(res.status);
//   console.log(res.body); // посметреть ответ эндпоинта

//   expect(res.body.length).toBe(0); // проверяем ответ эндпоинта
//   expect(1).toBe(1); // проверяем ответ эндпоинта
// });