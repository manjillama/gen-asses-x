import { Model, Document } from 'mongoose';
import _ from 'lodash';
import APIFeatures from '../utils/apiFeatures';

/**
 * @param  {T} document Mongoose document
 * @param  {any} data
 * @returns Promise
 */
async function updateOneByDocument<T extends Document>(document: T, data: any): Promise<T> {
  const doc = Object.assign(document, data);
  await doc.save();
  return doc;
}

type GetAll<T> = {
  populate: (options: any) => GetAll<T>;
  exec: () => Promise<[T[], number, number]>;
};
/**
 * @param  {Model<T>} model
 * @param  {any} query i.e. { price: { gte: 500, lte: 3000 }, page: 2, size: 30, type: 'clothing', sort: '-price' }
 * @param {object | string} populate populate query field
 */
function getAll<T extends Document>(model: Model<T>, query: any): GetAll<T> {
  const { limit } = query;

  const size = limit && !Number.isNaN(Number(limit)) ? Number(limit) : 40;

  const features = new APIFeatures(model.find(), query).filter().sort().limitFields().paginate(size);

  const totalCountFilter = _.omit(query, ['page', 'sort', 'limit', 'fields']);

  return {
    populate(options: any) {
      features.query.populate(options);
      return this;
    },
    async exec() {
      const [data, totalCount] = await Promise.all([features.query, model.countDocuments(totalCountFilter as any)]);
      return [data, totalCount, size];
    }
  };
}

function deleteOne<T extends Document>(model: Model<T>, _id: string): any {
  return model.deleteOne({ _id } as any);
}

export default {
  updateOneByDocument,
  getAll,
  deleteOne
};
