import dotEnv from 'dotenv';

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'ci_test') {
  dotEnv.config({ path: './src/test/.test.env' });
}

const {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  NODE_ENV,
  TAG,
  ROW_LIMIT,
  JWT_SECRET,
  JWT_SECRET_REFRESH,
  REDIS_HOST,
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_EXPIRE,
} = process.env;

let refreshTokenExpiresIn = REFRESH_TOKEN_EXPIRE * 1;
if (REFRESH_TOKEN_EXPIRE.indexOf('y') > 0)
  refreshTokenExpiresIn =
    REFRESH_TOKEN_EXPIRE.match(/\d+/)[0] * 365 * 24 * 60 * 60;
else if (REFRESH_TOKEN_EXPIRE.indexOf('m') > 0)
  refreshTokenExpiresIn =
    REFRESH_TOKEN_EXPIRE.match(/\d+/)[0] * 30 * 24 * 60 * 60;
else if (REFRESH_TOKEN_EXPIRE.indexOf('d') > 0)
  refreshTokenExpiresIn = REFRESH_TOKEN_EXPIRE.match(/\d+/)[0] * 24 * 60 * 60;

const ENV = {
  APP_PORT: 3000,
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  NODE_ENV,
  TAG,
  ROW_LIMIT: ROW_LIMIT * 1, // convert to integer by (* 1)
  JWT_SECRET: JWT_SECRET || 'hJPi2465mjIrpYPb',
  JWT_SECRET_REFRESH: JWT_SECRET_REFRESH || 'd486c2McJF0K9Xub',
  REDIS_HOST,
  ACCESS_TOKEN_EXPIRE: ACCESS_TOKEN_EXPIRE ? ACCESS_TOKEN_EXPIRE * 1 : 3600,
  REFRESH_TOKEN_EXPIRE:
    refreshTokenExpiresIn > 0
      ? refreshTokenExpiresIn
      : REFRESH_TOKEN_EXPIRE * 1,
};

export default ENV;
