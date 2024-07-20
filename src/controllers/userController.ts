import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import User from '../models/User';
import factoryService from '../services/factoryService';
import userService from '../services/userService';
import { IRequest } from '../interfaces/IRequest';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const [users, total, size] = await factoryService.getAll(User, req.query).exec();

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      total,
      size,
      users
    }
  });
};

const getCurrentUser = async (req: IRequest, res: Response): Promise<void> => {
  const data = await userService.getUser(req.user);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data
  });
};

const updateCurrentUser = async (req: IRequest, res: Response): Promise<void> => {
  const data = await userService.updateUser(req.body, req.user);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data
  });
};

const deleteCurrentUser = async (req: IRequest, res: Response): Promise<void> => {
  await userService.deleteUser(req.user);

  res.status(StatusCodes.OK).json({
    status: 'success'
  });
};

export default { getUsers, getCurrentUser, updateCurrentUser, deleteCurrentUser };
