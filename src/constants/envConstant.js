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
} = process.env;

const ENV = {
  APP_PORT: 3000,
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  NODE_ENV,
  TAG,
  ROW_LIMIT: parseInt(ROW_LIMIT, 10),
  JWT_SECRET,
};

export default ENV;
