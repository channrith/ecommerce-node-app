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
  const status = HTTP_STATUS_CODE.OK;
  return res.status(status).json({
    status,
    message,
    data,
  });
};

/**
 * Description: The request has succeeded and a new resource has been created
 * Return: 201 Created
 */
export const responseResourceCreated = (
  res,
  message = HTTP_RESPONSE_MESSAGE.CREATED,
  data = {}
) => {
  const status = HTTP_STATUS_CODE.CREATED;
  return res.status(status).json({
    status,
    message,
    data,
  });
};

/**
 * Description: The user-agent may update its cached headers for this resource with the new ones
 * Return: 204 No Content
 */
export const responseNoContent = (
  res,
  message = HTTP_RESPONSE_MESSAGE.NO_CONTENT,
  data = {}
) => {
  const status = HTTP_STATUS_CODE.NO_CONTENT;
  return res.status(status).json({
    status,
    message,
    data,
  });
};

/**
 * Description: The server can not find the requested resource
 * Return: 404 Not Found
 */
export const responseNotFound = (
  res,
  message = HTTP_RESPONSE_MESSAGE.NOT_FOUND,
  data = {}
) => {
  const status = HTTP_STATUS_CODE.NOT_FOUND;
  return res.status(HTTP_STATUS_CODE.OK).json({
    status,
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
  const status = HTTP_STATUS_CODE.BAD_REQUEST;
  return res.status(status).json({
    status,
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
  const status = HTTP_STATUS_CODE.UNAUTHORIZED;
  return res.status(status).json({
    status,
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
  const status = HTTP_STATUS_CODE.FORBIDDEN;
  return res.status(status).json({
    status,
    message,
    data,
  });
};

/**
 * Description: The server has encountered a situation it doesn't know how to handle
 * Return: 500 Internal Server Error
 */
export const responseInternalServerError = (
  res,
  message = HTTP_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
  data = {}
) => {
  const status = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
  return res.status(status).json({
    status,
    message,
    data,
  });
};
