import mongoose from 'mongoose';
import ENV from '../constants/envConstant';

let DB_URI = `mongodb://${ENV.DB_USERNAME}:${ENV.DB_PASSWORD}@${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_DATABASE}?ssl=false`;
if (ENV.NODE_ENV === 'ci_test') {
  DB_URI = `mongodb://${ENV.DB_USERNAME}:${ENV.DB_PASSWORD}@${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_DATABASE}?authSource=admin&ssl=false`;
}

const connectDB = async () => {
  try {
    console.log('db connecting...');
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('db connected successfully.');
  } catch (error) {
    console.log('db connection error: ', error.message);
    throw error;
  }
};

export default connectDB;
