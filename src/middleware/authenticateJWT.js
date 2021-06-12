import jwt from 'jsonwebtoken';
import { ENV } from '../constants';
import {
  responseBadRequest,
  // responseForbiddenRequest,
  responseUnauthorizedRequest,
} from '../utils';

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // make sure the value of authorization header is given
  if (!authHeader) return responseUnauthorizedRequest(res);

  const token = authHeader.split(' ')[1];
  // make sure the value is a valid bearer token
  if (!token) return responseBadRequest(res, 'Invalid bearer token');

  const [user, err] = jwt.verify(token, ENV.JWT_SECRET, (error, data) => {
    if (error) return [null, error];
    return [data, null];
  });

  // if (err) return responseForbiddenRequest(res);
  if (err) return responseUnauthorizedRequest(res);
  req.auth = user;

  return next();
};

export default authenticateJWT;
