import express from 'express';
import { requireAuth } from '../middleware';
import { getUserAction } from '../controllers/user';

const router = express.Router();

router.get('/user/:userId', requireAuth, getUserAction);

export default router;
