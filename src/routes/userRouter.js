import express from 'express';
import { requireAuth } from '../middleware';
import { getUserByIdAction } from '../controllers/user';

const router = express.Router();

router.get('/user/:userId', requireAuth, getUserByIdAction);

export default router;
