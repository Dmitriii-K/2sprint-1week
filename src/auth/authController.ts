import { Request, Response } from "express";
import { LoginInputModel } from "../input-output-types/auth-type";
import { userCollection } from "../db/mongo-db";
const  bcrypt  =  require ( 'bcrypt' ); 


export const authUser = async (
  req: Request<any, any, LoginInputModel>,
  res: Response
) => {
  try {
  const saltRounds = 10;
  const { loginOrEmail, password } = req.body;
  const userHashPassword = await bcrypt.hash(password, saltRounds);

    const user = await userCollection.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] });
    if (!user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    } else {
       user;
    }
  const isCorrect = await bcrypt.compare(userHashPassword, user.password);
    if(isCorrect) {
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
  }
};

204;
400;
401;
