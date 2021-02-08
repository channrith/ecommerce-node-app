import express from 'express';
import { signupAction, logInAction } from '../controllers/auth';
import { signupValidator, loginValidator } from '../validators';

const router = express.Router();

router.post('/signup', signupValidator, signupAction);
router.post('/login', loginValidator, logInAction);

export default router;
