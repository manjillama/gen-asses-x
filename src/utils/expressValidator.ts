import { StatusCodes } from 'http-status-codes';
import { Request } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from './errors';

const validate = (req: Request): void => {
  const result = validationResult(req);
  if (!result.isEmpty())
    throw new AppError(
      'Invalid result',
      StatusCodes.BAD_REQUEST,
      result.array().map(({ msg }) => msg)
    );
};

export default { validate };
