import { req } from "./test-helpers";
import { blogCollection, connectDB } from "../src/db/mongo-db";
import { SETTINGS } from "../src/settings";
import {
  BlogInputModel,
  BlogDbType,
} from "../src/input-output-types/blogs-type";
import { authMiddleware, codedAuth } from "../src/middlewares/middlewareForAll";
import { createString, blog1 } from "./datasets";

describe("/blogs", () => {
  beforeAll(async () => {
    await connectDB();
    await blogCollection.drop();
  });
  afterAll(async () => {
    await blogCollection.drop();
});

  it("should create", async () => {
    // зачищаем базу данных
    await blogCollection.drop();
    const newBlog: BlogInputModel = {
      name: "n1",
      description: "d1",
      websiteUrl: "http://some.com",
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
  });

  it("shouldn't create 400", async () => {
    await blogCollection.drop();
    const newBlog: BlogInputModel = {
      name: "n1",
      description: "d1",
      websiteUrl: "http://some.com",
    };

    const res = await req
      .post(SETTINGS.PATH.BLOGS)
      .send(newBlog) // отправка данных
      .expect(401);

    // console.log(res.body)
  });

  it("shouldn't create 401", async () => {
    await blogCollection.drop();
    const newBlog: BlogInputModel = {
      name: "n1",
      description: "d1",
      websiteUrl: "http://some.com",
    };

    const res = await req
      .post(SETTINGS.PATH.BLOGS)
      .send(newBlog) // отправка данных
      .expect(401);

    // console.log(res.body)
  });

  it("should get empty array", async () => {
    await blogCollection.drop(); // очистка базы данных если нужно

    const res = await req.get(SETTINGS.PATH.BLOGS).expect(200); // проверяем наличие эндпоинта
    
    expect(res.body.length).toEqual(0);
    // console.log(res.body) // можно посмотреть ответ эндпоинта
  });

  it("should get not empty array", async () => {
    await blogCollection.insertOne(blog1); // заполнение базы данных начальными данными если нужно

    const res = await req.get(SETTINGS.PATH.BLOGS).expect(200);

    // console.log(res.body)

    expect(res.body.length).toEqual(1);
  });

  it("should get blog id", async () => {
    await blogCollection.drop(); // очистка базы данных если нужно

    const res = await req.get(SETTINGS.PATH.BLOGS).expect(200); // проверяем наличие эндпоинта
    
    expect(res.body.length).toEqual(0);
    // console.log(res.body) // можно посмотреть ответ эндпоинта
  });

  it("shouldn't get blog id", async () => {
    await blogCollection.insertOne(blog1); // заполнение базы данных начальными данными если нужно

    const res = await req.get(SETTINGS.PATH.BLOGS).expect(200);

    // console.log(res.body)

    expect(res.body.length).toEqual(1);
  });

  it("shouldn't find", async () => {
    await blogCollection.insertOne(blog1);

    const res = await req.get(SETTINGS.PATH.BLOGS + "/1").expect(404); // проверка на ошибку

    // console.log(res.body)
  });

  it("should update", async () => {
    await blogCollection.insertOne(blog1);
    const blog: BlogInputModel = {
      name: "n2",
      description: "d2",
      websiteUrl: "http://some2.com",
    };

    const res = await req
      .put(SETTINGS.PATH.BLOGS + "/" + blogCollection._id)
      .set({ Authorization: "Basic " + codedAuth })
      .send(blog)
      .expect(204); // проверка на ошибку

    // console.log(res.body)

    expect(db.blogs[0]).toEqual({ ...db.blogs[0], ...blog });
  });
  it("shouldn't update 404", async () => {
    setDB();
    const blog: BlogInputModel = {
      name: "n1",
      description: "d1",
      websiteUrl: "http://some.com",
    };

    const res = await req
      .put(SETTINGS.PATH.BLOGS + "/1")
      .set({ Authorization: "Basic " + codedAuth })
      .send(blog)
      .expect(404); // проверка на ошибку

    // console.log(res.body)
  });

  it("shouldn't update 400", async () => {
    setDB();
    const blog: BlogInputModel = {
      name: "n1",
      description: "d1",
      websiteUrl: "http://some.com",
    };

    const res = await req
      .put(SETTINGS.PATH.BLOGS + "/1")
      .set({ Authorization: "Basic " + codedAuth })
      .send(blog)
      .expect(404); // проверка на ошибку

    // console.log(res.body)
  });

  it("shouldn't update 401", async () => {
    setDB(dataset1);
    const blog: BlogInputModel = {
      name: createString(16),
      description: createString(501),
      websiteUrl: createString(101),
    };

    const res = await req
      .put(SETTINGS.PATH.BLOGS + "/" + dataset1.blogs[0].id)
      .set({ Authorization: "Basic " + codedAuth + "error" })
      .send(blog)
      .expect(401); // проверка на ошибку

    // console.log(res.body)

    expect(db).toEqual(dataset1);
  });

  it("shouldn delete", async () => {
    await blogCollection.insertOne(blog1);

    const res = await req.get(SETTINGS.PATH.BLOGS + "/1").expect(404); // проверка на ошибку
    // console.log(res.body)
  });

  it("shouldn't delete 404", async () => {
    await blogCollection.insertOne(blog1);

    const res = await req.get(SETTINGS.PATH.BLOGS + "/1").expect(404); // проверка на ошибку
    // console.log(res.body)
  });

  it("shouldn't delete 401", async () => {
    await blogCollection.insertOne(blog1);

    const res = await req.get(SETTINGS.PATH.BLOGS + "/1").expect(404); // проверка на ошибку
    // console.log(res.body)
  })
});
