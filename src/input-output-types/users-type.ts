import { ObjectId } from "mongodb";

export type UserInputModel = {
  login: string;
  password: string;
  email: string;
};

export type UserViewModel = {
  id: string;
  login: string;
  email: string;
  createdAt: string;
};

export type UserDBModel = {
  _id?: ObjectId;
  login: string;
  password: string;
  email: string;
  createdAt: string;
};

export type PaginatorUserViewModel = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: UserViewModel[];
};

export type TypeUserPagination = {
  searchLoginTerm: string;
  searchEmailTerm: string;
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
};
