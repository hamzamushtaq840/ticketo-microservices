import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

interface UserPayload {
  id: string;
  email: string;
}

//now we define what currentUser object is ? It should have a
//current user property that can optionally be defined
//and if we define it. It will be of type UserPayload

//modifying existing interface
declare global {
  namespace Express {
    interface Request {
      //add this property inside that request interface defined in express
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    // currentUser will be null in current-user.ts
    return next();
  }

  try {
    //UserPayload : interface that describes what payload is
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
