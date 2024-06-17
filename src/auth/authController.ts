import { Request, Response } from "express";
import { LoginInputModel } from "../input-output-types/auth-type";

export const checkAuth = async (
  req: Request<any, any, LoginInputModel>,
  res: Response
) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

204;
400;
401;
