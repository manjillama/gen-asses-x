import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { StatusCodes } from 'http-status-codes';
import User, { IUser } from '../models/User';
import { AppError } from '../utils/errors';
import { keys } from '../config';
import userService, { TransformResponseType } from './userService';

function generateAccessToken(user: { email: string; id: string }) {
  return jwt.sign(user, keys.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
}

function generateTokens(user: IUser) {
  const accessToken = generateAccessToken({ email: user.email, id: user._id });
  const refreshToken = jwt.sign({ id: user._id }, keys.REFRESH_TOKEN_SECRET);

  user.refreshTokens.push({ token: refreshToken });
  user.save();

  return { accessToken, refreshToken };
}

type ResponseType = { user: TransformResponseType; accessToken: string; refreshToken: string };

const register = async (userData: Pick<IUser, 'email' | 'password' | 'refreshTokens'>): Promise<ResponseType> => {
  let user = await User.findOne({ email: userData.email });
  if (user) throw new AppError('User with the email already exists', StatusCodes.BAD_REQUEST);

  user = new User(userData);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const { accessToken, refreshToken } = generateTokens(user);
  return { user: userService.transformUserResponse(user), accessToken, refreshToken };
};

const login = async (email: string, password: string): Promise<any> => {
  const user = await User.findOne({ email }).select('+password +refreshTokens');
  if (!user) throw new AppError('Incorrect email or password', StatusCodes.UNAUTHORIZED);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError('Incorrect email or password', StatusCodes.UNAUTHORIZED);

  user.lastLoggedInAt = new Date();
  await user.save();

  const { accessToken, refreshToken } = generateTokens(user);
  return { user: userService.transformUserResponse(user), accessToken, refreshToken };
};

const refresh = async (refreshToken: string): Promise<string> => {
  const decoded: any = await promisify<string, string>(jwt.verify)(refreshToken, keys.REFRESH_TOKEN_SECRET).catch(
    () => {
      throw new AppError('Refresh token is invalid', StatusCodes.UNAUTHORIZED);
    }
  );

  const user = await User.findOne({ _id: decoded.id, 'refreshTokens.token': refreshToken }).select('+refreshTokens');
  if (!user) throw new AppError('Refresh token has expired or does not exist', StatusCodes.UNAUTHORIZED);

  const accessToken = generateAccessToken({ email: user.email, id: user._id });
  return accessToken;
};

export default {
  register,
  login,
  refresh
};
