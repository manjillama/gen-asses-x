/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = MongoMemoryServer.create();
export const connect = async (): Promise<void> => {
  const uri = await (await mongod).getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
};
export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.close();
  await (await mongod).stop();
};
export const clearDatabase = async (): Promise<void> => {
  const collections = mongoose.connection.collections;

  for (const key of Object.keys(collections)) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
