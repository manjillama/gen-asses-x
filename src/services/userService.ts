import User, { IUser } from '../models/User';
import factoryService from './factoryService';

export type TransformResponseType = { _id: string; email: string; name: string; lastLoggedInAt: Date };

const transformUserResponse = (user: IUser): TransformResponseType => {
  const { _id, email, name, lastLoggedInAt } = user;
  return {
    _id,
    email,
    name,
    lastLoggedInAt
  };
};

const getUser = (user: IUser): TransformResponseType => transformUserResponse(user);

const updateUser = async (userData: Pick<IUser, 'email' | 'name'>, user: IUser): Promise<TransformResponseType> => {
  const updatedUser = await factoryService.updateOneByDocument(user, userData);
  return transformUserResponse(updatedUser);
};

const deleteUser = (user: IUser): Promise<any> => factoryService.deleteOne(User, user._id);

export default { getUser, updateUser, deleteUser, transformUserResponse };
