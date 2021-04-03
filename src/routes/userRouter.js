import express from 'express';
import { authenticateJWT } from '../middleware';
import { getUserByIdAction } from '../controllers/user';

const router = express.Router();
router.get('/user/:userId', authenticateJWT, getUserByIdAction);

export default router;
