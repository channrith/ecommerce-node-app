import { redis } from '../configs';
import { ENV, REDIS_KEY } from '../constants';
import { createHttpError, responseJson, verifyToken } from '../utils';

const authenticateJWT = async (req, res, next) => {
  const { authorization } = req.headers;

  // make sure the value of authorization header is present
  if (!authorization)
    return responseJson(
      res,
      createHttpError.badRequest('Authentication token is missing')
    );

  // make sure the value is a valid bearer token
  const token = authorization.split(' ')[1];
  if (!token)
    return responseJson(
      res,
      createHttpError.badRequest('Invalid bearer token')
    );

  // start verify token width JWT
  const [decoded, err] = verifyToken(token, ENV.JWT_SECRET);
  if (err) return responseJson(res, createHttpError.unauthorized());

  // if token is not a valid token list
  const redisKey = `${REDIS_KEY.ACCESS_TOKEN}:${decoded._id}`;
  const validToken = await redis.get(redisKey);
  if (!validToken || (validToken && validToken !== token))
    return responseJson(res, createHttpError.unauthorized('Session expired'));

  req.auth = decoded;

  return next();
};

export default authenticateJWT;
