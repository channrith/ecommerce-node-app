/**
 * Print error detail to console
 */
export const printError = (functionName, errorMessage) => {
  const dt = new Date(new Date().getTime());
  console.log(
    `<<<<<<<< Function ${functionName}:`,
    errorMessage,
    dt.toString()
  );
};

/**
 * Return validation error message
 */
export const validationErrorFormat = (errors) => {
  const errorData = errors.array();
  const { param, msg } = errorData[0].param;
  return { param, message: msg };
};
