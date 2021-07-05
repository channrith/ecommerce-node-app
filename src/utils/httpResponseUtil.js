import { HTTP_STATUS_CODE, HTTP_RESPONSE_MESSAGE } from '../constants';
import { isJsonString } from './commonUtil';

export const createHttpError = {
  /**
   * Description: The server could not understand the request due to invalid syntax
   * Return: 400 Bad Request
   */
  badRequest: (message = HTTP_RESPONSE_MESSAGE.BAD_REQUEST) => {
    const status = HTTP_STATUS_CODE.BAD_REQUEST;
    return JSON.stringify({
      status,
      message,
      data: {},
    });
  },

  /**
   * Description: The server can not find the requested resource
   * Return: 404 Not Found
   */
  notFound: (message = HTTP_RESPONSE_MESSAGE.NOT_FOUND) => {
    const status = HTTP_STATUS_CODE.NOT_FOUND;
    return JSON.stringify({
      status,
      message,
      data: {},
    });
  },

  /**
   * Description: This mean unauthenticated
   * Return: 401 Unauthorized
   */
  unauthorized: (message = HTTP_RESPONSE_MESSAGE.UNAUTHORIZED) => {
    const status = HTTP_STATUS_CODE.UNAUTHORIZED;
    return JSON.stringify({
      status,
      message,
      data: {},
    });
  },

  /**
   * Description: The client does not have access rights to the content
   * Return: 403 Forbidden
   */
  forbidden: (message = HTTP_RESPONSE_MESSAGE.FORBIDDEN) => {
    const status = HTTP_STATUS_CODE.FORBIDDEN;
    return JSON.stringify({
      status,
      message,
      data: {},
    });
  },

  /**
   * Description: The server has encountered a situation it doesn't know how to handle
   * Return: 500 Internal Server Error
   */
  internalServerError: (
    message = HTTP_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
  ) => {
    const status = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
    return JSON.stringify({
      status,
      message,
      data: {},
    });
  },
};

/**
 * Description: HTTP Response JSON data with HTTP status
 */
export const responseJson = (res, data) => {
  const response = isJsonString(data)
    ? JSON.parse(data)
    : {
        status: HTTP_STATUS_CODE.OK,
        message: HTTP_RESPONSE_MESSAGE.OK,
        data,
      };

  return res
    .status(
      response.status === HTTP_STATUS_CODE.NOT_FOUND ? 200 : response.status
    )
    .json(response);
};
