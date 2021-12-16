import jwt from "jsonwebtoken";
import { HTTP_ERROR_401, HTTP_ERROR_403 } from "../../common/statuses";
import connectDb from "./db";
const JWT_SECRET = process.env.JWT_SECRET;

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });
}
function verify(event) {
  const headers = event.headers;
  const token = headers.authorization || headers.Authorization;
  if (!token) {
    throw HTTP_ERROR_401;
  }

  return await jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) throw HTTP_ERROR_403;
    return user;
  });
}

async function generateRefreshToken(user) {
  await connectDb();
  const userId = user._id;
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET);
  await RefreshToken.create({
    userId: userId,
    token: refreshToken,
  });

  return refreshToken;
}
