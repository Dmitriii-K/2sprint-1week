import { Request, Response } from "express";
import { UserInputModel, UserDBModel, UserViewModel } from "../input-output-types/users-type";
import { userCollection } from "../db/mongo-db";
import { OutputErrorsType } from "../input-output-types/output-errors-type";
const  bcrypt  = require ( 'bcryptjs' ); 

export const createUserController = async (
  req: Request<any, any, UserInputModel>,
  res: Response<UserViewModel | OutputErrorsType>,
) => {
  try {
    const saltRounds = 10;
    const password  = req.body.password;
    const salt = await bcrypt.genSalt(saltRounds);
    const userHashPassword = await bcrypt.hash(password, salt)
    
    const createDate = new Date().toISOString();
    const newUser: UserDBModel = {
      login: req.body.login,
      password: userHashPassword,
      email: req.body.email,
      createdAt: createDate,
    };
    const existingUser = await userCollection.findOne({ $or: [{ login: newUser.login }, { email: newUser.email }] });
    if (existingUser) {
      res.status(400).json({ errorsMessages: [{field: 'email and login', message: 'email and login should be unique'}]
        });
        return;
    };
    const newUserDB = await userCollection.insertOne(newUser)!;
    if (newUserDB) {
      const mapNewUser: UserViewModel = {
        login: req.body.login,
        email: req.body.email,
        createdAt: createDate,
        id: newUserDB.insertedId.toString(),
      };
      res.status(201).json(mapNewUser);
    } else {
      res.sendStatus(500);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

201;
400;
401;
