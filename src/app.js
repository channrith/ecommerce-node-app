import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ENV } from './constants';
import { dbConnect } from './configs';
import { errorHandler } from './middleware';
import { authRouter, userRouter } from './routes';

const startServer = async () => {
  await dbConnect();

  const app = express();

  // Express middleware
  app.use(express.json());
  // Enable CORS
  app.use(cors());
  // Parse Cookie header and populate req.cookie
  app.use(cookieParser());
  // Routes middleware
  app.use('/api', authRouter);
  app.use('/api', userRouter);
  // Error handling
  app.use(errorHandler);

  app.listen(ENV.APP_PORT, () => {
    console.log(`Server is running on port ${ENV.APP_PORT}`);
  });
};

startServer();
