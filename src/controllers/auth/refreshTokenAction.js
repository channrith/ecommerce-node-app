import { validationResult } from 'express-validator';
import {
  createHttpError,
  responseJson,
  signToken,
  validationErrorFormat,
  printError,
  verifyToken,
} from '../../utils';
import { redis } from '../../configs';
import { ENV, COOKIE_KEY, REDIS_KEY } from '../../constants';
import { User } from '../../models';

const refreshTokenAction = async (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length) {
    const { message } = validationErrorFormat(errors);
    return responseJson(res, createHttpError.badRequest(message));
  }

  const token =
    req.cookies[`${COOKIE_KEY.REFRESH_TOKEN}`] || req.body.refreshToken;

  if (!token)
    return responseJson(
      res,
      createHttpError.badRequest(
        'refreshToken',
        'Refresh token field is required'
      )
    );

  const [decoded, err] = verifyToken(token, ENV.JWT_SECRET_REFRESH);
  if (err) return responseJson(res, createHttpError.unauthorized());

  // if token is not a valid token list
  const redisKey = `${REDIS_KEY.REFRESH_TOKEN}:${decoded._id}`;
  const validToken = await redis.get(redisKey);
  if (!validToken || (validToken && validToken !== token))
    return responseJson(res, createHttpError.unauthorized('Session expired'));

  const user = await User.findById(decoded._id);
  if (!user)
    return responseJson(
      res,
      createHttpError.unauthorized('Account does not exist')
    );
  const { _id, name, email, role } = user;

  // generate access token
  const [accessToken, accessTokenErr] = signToken({
    audience: _id,
    secret: ENV.JWT_SECRET,
    expiresIn: ENV.ACCESS_TOKEN_EXPIRE,
  });

  // something went wrong while trying to generate an access token
  if (accessTokenErr) {
    printError('signToken', accessTokenErr);
    return responseJson(
      res,
      createHttpError.internalServerError(
        'Something went wrong while trying to generate an access token'
      )
    );
  }

  // generate refresh token
  const [refreshToken, refreshTokenErr] = signToken({
    audience: _id,
    secret: ENV.JWT_SECRET_REFRESH,
  });

  // something went wrong while trying to generate a refresh token
  if (refreshTokenErr) {
    printError('signToken', refreshTokenErr);
    return responseJson(
      res,
      createHttpError.internalServerError(
        'Something went wrong while trying to generate a refresh token'
      )
    );
  }

  // persist the refresh token in cookie
  res.cookie(COOKIE_KEY.REFRESH_TOKEN, refreshToken);

  // persist the refresh token in redis with expiry date
  await redis.setex(
    `${REDIS_KEY.REFRESH_TOKEN}:${_id}`,
    ENV.REFRESH_TOKEN_EXPIRE,
    refreshToken
  );

  // persist the access token in redis with expiry date
  await redis.setex(
    `${REDIS_KEY.ACCESS_TOKEN}:${_id}`,
    ENV.ACCESS_TOKEN_EXPIRE,
    accessToken
  );

  return responseJson(res, {
    accessToken,
    refreshToken,
    user: { _id, email, name, role },
  });
};

export default refreshTokenAction;
