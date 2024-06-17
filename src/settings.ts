import { config } from "dotenv";
config();

// const envValidation = (param: string | undefined) => {
//   if (!param || param.length < 1) {
//     throw new Error("check env");
//   }
//   return true;
// };

export const SETTINGS = {
  PORT: process.env.PORT || 3003,
  PATH: {
    BLOGS: "/blogs",
    POSTS: "/posts",
    TESTING: "/testing",
    AUTH: "/auth",
    USERS: "/users",
  },
  ADMIN: process.env.ADMIN || "",
  MONGO_URL: process.env.MONGO_URL || "mongodb://0.0.0.0:27017",
  BLOG_COLLECTION_NAME: process.env.BLOG_COLLECTION_NAME || "",
  POST_COLLECTION_NAME: process.env.POST_COLLECTION_NAME || "",
  USER_COLLECTION_NAME: process.env.USER_COLLECTION_NAME || "",
  DB_NAME: process.env.DB_NAME || "",

  // ADMIN: envValidation(process.env.ADMIN) ? process.env.ADMIN : "",
  // MONGO_URL: process.env.MONGO_URL || "mongodb://0.0.0.0:27017",
  // BLOG_COLLECTION_NAME: envValidation(process.env.BLOG_COLLECTION_NAME)
  //   ? process.env.BLOG_COLLECTION_NAME
  //   : "",
  // POST_COLLECTION_NAME: envValidation(process.env.POST_COLLECTION_NAME)
  //   ? process.env.POST_COLLECTION_NAME
  //   : "",
  // DB_NAME: envValidation(process.env.DB_NAME) ? process.env.DB_NAME : "",
};
