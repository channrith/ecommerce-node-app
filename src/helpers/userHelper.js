/**
 * Return validation error message
 */
export const validationErrorFormat = (errors) => {
  const errorData = errors.array();
  const { param, msg } = errorData[0].param;
  return { param, message: msg };
};
