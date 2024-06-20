import { Request, Response } from "express";
import {
  PaginatorUserViewModel,
  TypeUserPagination,
  UserDBModel,
  UserViewModel,
} from "../input-output-types/users-type";
import { userCollection } from "../db/mongo-db";
import { userPagination } from "../middlewares/middlewareForAll";
import { WithId } from "mongodb";

const userMap = (user: WithId<UserDBModel>): UserViewModel => {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
};

export const getUserController = async (
  req: Request<any, any, any, TypeUserPagination>,
  res: Response<PaginatorUserViewModel>
) => {
  const queryParams = userPagination(req.query);
  const searchEmail = req.query.searchEmailTerm
    ? { email: { $regex: req.query.searchEmailTerm, $options: "i" } }
    : {};
  const searchLogin = req.query.searchLoginTerm
    ? { login: { $regex: req.query.searchLoginTerm, $options: "i" } }
    : {};
  try {
    const filter = { $or: [searchLogin, searchEmail]}
    const items: WithId<UserDBModel>[] = await userCollection
      .find(filter)
      .sort(queryParams.sortBy, queryParams.sortDirection)
      .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
      .limit(queryParams.pageSize)
      .toArray();
    const totalCount = await userCollection.countDocuments(filter);
    const newUser: PaginatorUserViewModel = {
      pagesCount: Math.ceil(totalCount / queryParams.pageSize),
      page: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
      totalCount,
      items: items.map(userMap),
    };
    res.status(200).json(newUser);
    return;
  } catch (e) {
    console.log(e);
    return { error: "some error" };
  }
};
