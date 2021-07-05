import express from 'express';
import {
  refreshTokenAction,
  signupAction,
  logInAction,
  logOutAction,
} from '../controllers/auth';
import { authenticateJWT, controllerCallback } from '../middleware';
import { signupValidator, loginValidator } from '../validators';

const router = express.Router();

// refresh token route
router.post('/refresh-token', async (req, res, next) => {
  const handler = await controllerCallback(refreshTokenAction, {
    req,
    res,
    next,
  });
  return handler;
});

// signup route
router.post('/signup', signupValidator, async (req, res, next) => {
  const handler = await controllerCallback(signupAction, {
    req,
    res,
    next,
  });
  return handler;
});

// login route
router.post('/login', loginValidator, async (req, res, next) => {
  const handler = await controllerCallback(logInAction, {
    req,
    res,
    next,
  });
  return handler;
});

// logout route
router.get('/logout', authenticateJWT, async (req, res, next) => {
  const handler = await controllerCallback(logOutAction, {
    req,
    res,
    next,
  });
  return handler;
});

export default router;
