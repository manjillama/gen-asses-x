export const keys = {
  CORS_WHITELISTS: new RegExp(process.env.CORS_WHITELISTS),
  LOGS: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
};
