// const { MongoMemoryServer } = require('mongodb-memory-server');

// let mongod;

// module.exports = async () => {
//   mongod = await MongoMemoryServer.create();

//   const uri = mongod.getUri();
//   process.env.MONGODB_URI = uri;

//   return {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     globals: {
//       'ts-jest': {
//         tsconfig: 'tsconfig.json'
//       }
//     }
//   };
// };

// // Setup function before tests
// module.exports.beforeAll = async () => {
//   await mongod.start();
// };

// // Teardown function after tests
// module.exports.afterAll = async () => {
//   await mongod.stop();
// };
module.exports = {
  roots: ['.'],
  testEnvironment: 'node',
  // setupFilesAfterEnv: ['./tests/setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
