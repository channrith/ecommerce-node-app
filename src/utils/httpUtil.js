import { HTTP_STATUS_CODE, HTTP_RESPONSE_MESSAGE } from '../constants';

/**
 * Description: The server could not understand the request due to invalid syntax
 * Return: 400 Bad Request
 */
export const badRequest = (
  res,
  message = HTTP_RESPONSE_MESSAGE.BAD_REQUEST
) => {
  return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
    error: 1,
    message,
    data: {},
  });
};
