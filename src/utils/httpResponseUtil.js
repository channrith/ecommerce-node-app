import { HTTP_STATUS_CODE, HTTP_RESPONSE_MESSAGE } from '../constants';

/**
 * Description: The request has succeeded
 * Return: 200 OK
 */
export const responseJson = (
  res,
  data = {},
  message = HTTP_RESPONSE_MESSAGE.OK
) => {
  return res.status(HTTP_STATUS_CODE.OK).json({
    error: 0,
    message,
    data,
  });
};

/**
 * Description: The server could not understand the request due to invalid syntax
 * Return: 400 Bad Request
 */
export const responseBadRequest = (
  res,
  message = HTTP_RESPONSE_MESSAGE.BAD_REQUEST,
  data = {}
) => {
  return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
    error: 1,
    message,
    data,
  });
};

/**
 * Description: This mean unauthenticated
 * Return: 401 Unauthorized
 */
export const responseUnauthorizedRequest = (
  res,
  message = HTTP_RESPONSE_MESSAGE.UNAUTHORIZED,
  data = {}
) => {
  return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
    error: 1,
    message,
    data,
  });
};

/**
 * Description: The client does not have access rights to the content
 * Return: 403 Forbidden
 */
export const responseForbiddenRequest = (
  res,
  message = HTTP_RESPONSE_MESSAGE.FORBIDDEN,
  data = {}
) => {
  return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
    error: 1,
    message,
    data,
  });
};
