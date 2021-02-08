import expressJwt from 'express-jwt';
import { ENV } from '../constants';

const requireAuth = expressJwt({
  secret: ENV.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth',
});

export default requireAuth;
