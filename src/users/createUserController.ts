import { Request, Response } from "express";
import { UserInputModel, UserDBModel } from "../input-output-types/users-type";
import { OutputErrorsType } from "../input-output-types/output-errors-type";
import { userCollection } from "../db/mongo-db";

export const createUserController = async (
  req: Request<any, any, UserInputModel>,
  res: Response
) => {
  try {
    const createDate = new Date().toISOString();
    const newUser: UserDBModel = {
      login: req.body.login,
      email: req.body.email,
      createdAt: createDate,
    };
    const newUserDB = await userCollection.insertOne(newUser)!;
    if (newUserDB) {
      const mapNewUser = {
        login: req.body.login,
        email: req.body.email,
        createdAt: createDate,
        id: newUserDB.insertedId,
      };
      res.status(201).json(mapNewUser);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
  }
};

201;
400;
401;
