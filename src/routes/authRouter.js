import express from 'express';
import { signupAction, logInAction, logOutAction } from '../controllers/auth';
import { authenticateJWT } from '../middleware';
import { signupValidator, loginValidator } from '../validators';

const router = express.Router();

router.get('/logout', authenticateJWT, logOutAction);
router.post('/signup', signupValidator, signupAction);
router.post('/login', loginValidator, logInAction);

export default router;
