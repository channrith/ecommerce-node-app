import jwt from 'jsonwebtoken';
import { ENV } from '../constants';
import {
  responseForbiddenRequest,
  responseUnauthorizedRequest,
} from '../utils';

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return responseUnauthorizedRequest(res);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, ENV.JWT_SECRET, (err, user) => {
    if (err) {
      return responseForbiddenRequest(res);
    }

    req.auth = user;
    next();
  });
};

export default authenticateJWT;
