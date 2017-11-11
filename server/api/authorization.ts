import * as jwtAuth from 'express-jwt';
import { Request, Response } from 'express';

export const authorization = jwtAuth({ secret: process.env.JWT_SECRET });
export const processAuthError = (error:Error, req:Request, res:Response, next:Function) => {
  if (error.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized access');
  } else {
    next();
  }
};
