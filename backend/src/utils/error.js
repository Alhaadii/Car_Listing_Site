export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.message = message || "An unexpected error occurred";
  error.statusCode = statusCode || 500;
  return error;
};
