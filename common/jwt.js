import jwt from "jsonwebtoken";
import { HTTP_ERROR_401, HTTP_ERROR_403 } from "../common/statuses";

const JWT_SECRET = process.env.JWT_SECRET;

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });
}
async function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "14d",
  });

  return refreshToken;
}

function verify(event) {
  const headers = event.headers;
  const auth = headers.authorization || headers.Authorization;
  const token = auth.split("Bearer ")[1];

  if (!token) {
    throw HTTP_ERROR_401;
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return HTTP_ERROR_403;
    return user;
  });
}

export { generateAccessToken, generateRefreshToken, verify };
