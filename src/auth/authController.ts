import { Request, Response } from "express";
import { LoginInputModel } from "../input-output-types/auth-type";
const  bcrypt  =  require ( 'bcrypt' ); 


export const checkAuthUser = async (
  req: Request<any, any, LoginInputModel>,
  res: Response
) => {
  const saltRounds = 10;
  const myPlaintextPassword = 's0/\/\P4$$w0rD';
  const password = ;
  const loginOrEmail = ;
  try {
  const hash = await bcrypt.hashSync(myPlaintextPassword, saltRounds);
  const match = await bcrypt.compare(password, user.passwordHash);

    if(match) {
        //login
    }
  } catch (error) {
    console.log(error);
  }
};

204;
400;
401;
