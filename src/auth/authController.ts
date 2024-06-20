import { Request, Response } from "express";
import { LoginInputModel } from "../input-output-types/auth-type";
import { userCollection } from "../db/mongo-db";
import { UserDBModel } from "../input-output-types/users-type";
const  bcrypt  =  require ( 'bcrypt' ); 


export const authUser = async (
  req: Request<any, any, LoginInputModel>,
  res: Response
) => {
  try {
  const saltRounds = 10;
  const { loginOrEmail, password } = req.body;
  const userHashPassword = await bcrypt.hash(password, saltRounds);

    const authUser: UserDBModel = await userCollection.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] });
    if (!authUser) {
      res.status(401).json({ errorsMessages: [{field: 'user', message: 'user not found'}] });
    };
  const isCorrect = await bcrypt.compare(userHashPassword, authUser?.password);
    if(isCorrect) {
      res.sendStatus(204);
    } else {
      res.status(401).json({ errorsMessages: [{field: 'password and login', message: 'password or login is wrong'}] });
    }
  } catch (error) {
    console.log(error);
  }
};

204;
400;
401;
