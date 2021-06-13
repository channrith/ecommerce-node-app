/**
 * Get unique error field name
 */
export const uniqueMessage = (error) => {
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
export const errorHandler = (error) => {
  let { message } = error;
  if (error.name === 'CastError') {
    message = `Invalid resource Id`;
  } else if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
        message =
          'The server encountered an internal error or misconfiguration ' +
          'and was unable to complete your request';
    }
  } else {
    for (const errorName in error.errors) {
      if (error.errors[errorName].message)
        message = error.errors[errorName].message;
    }
  }

  return message;
};
