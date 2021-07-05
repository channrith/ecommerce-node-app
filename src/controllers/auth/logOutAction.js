import { redis } from '../../configs';
import { COOKIE_KEY, REDIS_KEY } from '../../constants';
import { createHttpError, responseJson } from '../../utils';

const logOutAction = async (req, res) => {
  const { authorization } = req.headers;

  // make sure request is a valid request
  if (!req.auth) return responseJson(res, createHttpError.unauthorized());

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

  // remove token from the token list
  await redis.del(`${REDIS_KEY.ACCESS_TOKEN}:${req.auth._id}`);
  await redis.del(`${REDIS_KEY.REFRESH_TOKEN}:${req.auth._id}`);

  // remove client cookie
  res.clearCookie(COOKIE_KEY.REFRESH_TOKEN);
  return responseJson(res);
};

export default logOutAction;
