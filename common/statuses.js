const HTTP_ERROR_400 = {
  httpStatusCode: 400,
  statusCode: 400,
  message_en: "Bad request",
};
// Unauthorized
const HTTP_ERROR_401 = {
  httpStatusCode: 401,
  statusCode: 401,
  message_en: "Unauthorized",
};
// Forbidden
const HTTP_ERROR_403 = {
  httpStatusCode: 403,
  statusCode: 403,
  message_en: "Forbidden",
};
// Not found
const HTTP_ERROR_404 = {
  httpStatusCode: 404,
  statusCode: 404,
  message_en: "Not Found",
};
// Method not allowed
const HTTP_ERROR_405 = {
  httpStatusCode: 405,
  statusCode: 405,
  message_en: "Method Not Allowed",
};

export {
  HTTP_ERROR_400,
  HTTP_ERROR_401,
  HTTP_ERROR_403,
  HTTP_ERROR_404,
  HTTP_ERROR_405,
};
