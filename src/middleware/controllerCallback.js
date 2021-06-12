import { responseJson } from '../utils';

/**
 * Get unique error field name
 */
const uniqueMessage = (error) => {
  let output;
  try {
    const fieldName = error.message.substring(
      error.message.lastIndexOf('.$') + 2,
      error.message.lastIndexOf('_1')
    );

    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      ' already exists';
  } catch (ex) {
    output = 'Unique field already exists';
  }

  return output;
};

/**
 * Return error message from error object
 */
const errorHandler = (error) => {
  let { message } = error;
  if (error.name === 'CastError') {
    message = `Resource not found`;
  } else if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (const errorName in error.errors) {
      if (error.errors[errorName].message)
        message = error.errors[errorName].message;
    }
  }

  return message;
};

const controllerCallback = async (actionHandler, { req, res, next }) => {
  try {
    return await actionHandler(req, res, next);
  } catch (error) {
    console.log('Function controllerCallback:', error);
    return responseJson(res, {}, errorHandler(error));
  }
};

export default controllerCallback;
