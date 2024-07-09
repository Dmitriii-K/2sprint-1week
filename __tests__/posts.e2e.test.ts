import { req } from "./test-helpers";
import { postCollection, connectDB } from "../src/db/mongo-db";
import { SETTINGS } from "../src/settings";
import { codedAuth } from "../src/middlewares/middlewareForAll";
import { PostInputModel } from "../src/input-output-types/posts-type";
import { post1 } from "./datasets";

describe("/posts", () => {
  beforeAll(async () => {
    await connectDB();
    await postCollection.drop();
  });
  afterAll(async () => {
    await postCollection.drop();
});

  it("should create", async () => {
    // setDB(dataset1);
    await postCollection.drop();
    const newPost: PostInputModel = {
      title: "t1",
      shortDescription: "s1",
      content: "c1",
      blogId: dataset1.blogs[0].id,
    };

    const res = await req
      .post(SETTINGS.PATH.POSTS)
      .set({ Authorization: "Basic " + codedAuth })
      .send(newPost) // отправка данных
      .expect(201);

    // console.log(res.body)

    expect(res.body.title).toEqual(newPost.title);
    expect(res.body.shortDescription).toEqual(newPost.shortDescription);
    expect(res.body.content).toEqual(newPost.content);
    expect(res.body.blogId).toEqual(newPost.blogId);
    expect(res.body.blogName).toEqual(dataset1.blogs[0].name);
    expect(typeof res.body.id).toEqual("string");

    expect(res.body).toEqual(db.posts[0]);
  });
  it("shouldn't create 401", async () => {
    await postCollection.drop();
    const newPost: PostInputModel = {
      title: "t1",
      shortDescription: "s1",
      content: "c1",
      blogId: dataset1.blogs[0].id,
    };

    const res = await req
      .post(SETTINGS.PATH.POSTS)
      .send(newPost) // отправка данных
      .expect(401);

    // console.log(res.body)

    expect(db.posts.length).toEqual(0);
  });
  it("should get empty array", async () => {
    await postCollection.drop(); // очистка базы данных если нужно

    const res = await req.get(SETTINGS.PATH.POSTS).expect(200); // проверяем наличие эндпоинта

    // console.log(res.body) // можно посмотреть ответ эндпоинта

    expect(res.body.length).toEqual(0); // проверяем ответ эндпоинта
  });
  it("should get not empty array", async () => {
    await postCollection.insertOne(post1); // заполнение базы данных начальными данными если нужно

    const res = await req.get(SETTINGS.PATH.POSTS).expect(200);

    // console.log(res.body)

    expect(res.body.length).toEqual(1);
    expect(res.body[0]).toEqual(dataset2.posts[0]);
  });
  it("shouldn't find", async () => {
    await postCollection.insertOne(post1);

    const res = await req.get(SETTINGS.PATH.POSTS + "/1").expect(404); // проверка на ошибку

    // console.log(res.body)
  });
  it("should find", async () => {
    await postCollection.insertOne(post1);

    const res = await req
      .get(SETTINGS.PATH.POSTS + "/" + dataset2.posts[0].id)
      .expect(200); // проверка на ошибку

    // console.log(res.body)

    expect(res.body).toEqual(dataset2.posts[0]);
  });
  it("should update", async () => {
    await postCollection.insertOne(post1);
    const post: PostInputModel = {
      title: "t2",
      shortDescription: "s2",
      content: "c2",
      blogId: dataset2.blogs[1].id,
    };

    const res = await req
      .put(SETTINGS.PATH.POSTS + "/" + dataset2.posts[0].id)
      .set({ Authorization: "Basic " + codedAuth })
      .send(post)
      .expect(204); // проверка на ошибку

    // console.log(res.body)

    expect(db.posts[0]).toEqual({
      ...db.posts[0],
      ...post,
      blogName: dataset2.blogs[1].name,
    });
  });
  it("shouldn't update 404", async () => {
    await postCollection.insertOne(post1);
    const post: PostInputModel = {
      title: "t1",
      shortDescription: "s1",
      content: "c1",
      blogId: dataset1.blogs[0].id,
    };

    const res = await req
      .put(SETTINGS.PATH.POSTS + "/1")
      .set({ Authorization: "Basic " + codedAuth })
      .send(post)
      .expect(404); // проверка на ошибку

    // console.log(res.body)
  });

  it("shouldn't update 401", async () => {
    await postCollection.insertOne(post1);
    const post: PostInputModel = {
      title: createString(31),
      content: createString(1001),
      shortDescription: createString(101),
      blogId: "1",
    };

    const res = await req
      .put(SETTINGS.PATH.POSTS + "/" + dataset2.posts[0].id)
      .set({ Authorization: "Basic " + codedAuth + "error" })
      .send(post)
      .expect(401); // проверка на ошибку

    // console.log(res.body)

    expect(db).toEqual(dataset2);
  });

  it("shouldn delete", async () => {
    await postCollection.insertOne(post1);

    const res = await req.get(SETTINGS.PATH.BLOGS + "/1").expect(404); // проверка на ошибку
    // console.log(res.body)
  });

  it("shouldn't delete", async () => {
    await postCollection.insertOne(post1);

    const res = await req.get(SETTINGS.PATH.BLOGS + "/1").expect(404); // проверка на ошибку
    // console.log(res.body)
  })
});



// // база данных для тестов
// import { MongoMemoryServer } from "mongodb-memory-server";
// import { connectToDB, postCollection } from "../src/db/mongo-db";

// // запуск виртуального сервера с временной бд
// const server = await MongoMemoryServer.create();

// const uri = server.getUri();
// const client: MongoClient = new MongoClient(uri);

// // ...

// // остановка виртуально сервера с бд после выполнения тестов
// await server.stop();
