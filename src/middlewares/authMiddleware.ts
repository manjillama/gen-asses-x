import { NextFunction, Response } from 'express';
import { promisify } from 'util';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errors';
import { keys } from '../config';
import User from '../models/User';
import { IRequest } from '../interfaces/IRequest';

const authenticate = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  // 1) Getting token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1];

  if (!token) throw new AppError('No token, authorization denied', StatusCodes.UNAUTHORIZED);

  // 2) Verification token
  const decoded: any = await promisify<string, string>(jwt.verify)(token, keys.ACCESS_TOKEN_SECRET).catch(() => {
    throw new AppError('Token is either invalid or has expired', StatusCodes.UNAUTHORIZED);
  });

  // 3) Check if user exists
  const currentUser = await User.findOne({ _id: decoded.id });
  if (!currentUser) throw new AppError('User does not exist', StatusCodes.UNAUTHORIZED);

  req.user = currentUser;
  next();
};

export default { authenticate };
