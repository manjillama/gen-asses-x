import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import { config, keys } from '../config';

export function loadDB(): void {
  if (process.env.NODE_ENV === config.ENVS.DEV || process.env.NODE_ENV === config.ENVS.PROD)
    mongoose
      .connect(keys.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(() => logger.info(`🗄  Connected to MongoDB`));
}
