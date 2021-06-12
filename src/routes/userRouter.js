import express from 'express';
import { authenticateJWT, controllerCallback } from '../middleware';
import { getUserByIdAction } from '../controllers/user';

const router = express.Router();

// get user by id route
router.get('/user/:userId', authenticateJWT, async (req, res, next) => {
  const handler = await controllerCallback(getUserByIdAction, {
    req,
    res,
    next,
  });
  return handler;
});

export default router;
