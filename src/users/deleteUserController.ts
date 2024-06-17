import { Request, Response } from "express";
import { userCollection } from "../db/mongo-db";
import { ObjectId } from "mongodb";

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req.params.id);
    const deleteBlog = await userCollection.deleteOne({ _id: id });
    if (deleteBlog.deletedCount === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
  }
};
