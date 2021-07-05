import {
  responseJson,
  createHttpError,
  errorHandler,
  printError,
} from '../utils';

const controllerCallback = async (actionHandler, { req, res, next }) => {
  try {
    return await actionHandler(req, res, next);
  } catch (error) {
    printError('controllerCallback', error);
    return responseJson(
      res,
      createHttpError.internalServerError(errorHandler(error))
    );
  }
};

export default controllerCallback;
