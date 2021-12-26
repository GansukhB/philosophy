import jwt from "jsonwebtoken";
import { HTTP_ERROR_401, HTTP_ERROR_403 } from "../common/statuses";

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "14d",
  });
  return refreshToken;
}

function verify(event, tokenType = "access") {
  const headers = event.headers;
  const requestBody =
    event && event.body
      ? JSON.parse(event.body)
      : /* istanbul ignore next */ {};
  let token = null;

  if (requestBody.token) {
    token = requestBody.token;
  } else if (
    headers &&
    (headers.hasOwnProperty("authorization") ||
      headers.hasOwnProperty("Authorization"))
  ) {
    token = headers.authorization || headers.Authorization;
  }

  if (!token) {
    throw HTTP_ERROR_401;
  }

  if (tokenType === "refresh") {
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) return HTTP_ERROR_403;
        return user;
      }
    );
  } else {
    return jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return HTTP_ERROR_403;
      return user;
    });
  }
}

export { generateAccessToken, generateRefreshToken, verify };
