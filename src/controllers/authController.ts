import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import authService from '../services/authService';
import expressValidator from '../utils/expressValidator';

const register = async (req: Request, res: Response): Promise<void> => {
  expressValidator.validate(req);

  const data = await authService.register(req.body);

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data
  });
};

const login = async (req: Request, res: Response): Promise<void> => {
  expressValidator.validate(req);

  const { email, password } = req.body;
  const data = await authService.login(email, password);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data
  });
};

const refresh = async (req: Request, res: Response): Promise<void> => {
  expressValidator.validate(req);

  const { refreshToken } = req.body;
  const accessToken = await authService.refresh(refreshToken);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: { accessToken, refreshToken }
  });
};

export default { register, login, refresh };
