import connectDb from "../../common/db";
import { verify, generateAccessToken } from "../../common/jwt";
import { User } from "../../common/models/User";

export default async function ({ event }) {
  try {
    await connectDb();
    // token --> using access token, just now...
    // check refresh token is valid
    const result = verify(event, "refresh");
    const email = result.email;

    // if user's refresh token is expired
    if (result.statusCode === 403) {
      throw HTTP_ERROR_403;
    }

    try {
      const user = await User.findOne({
        email: email,
      }).lean();

      // if user is registered, generate access token and return;
      if (user) {
        const accessToken = generateAccessToken({ email: email });
        return accessToken;
      } else {
        throw HTTP_ERROR_401;
      }
    } catch (e) {
      console.log("invalid user", e);
      throw HTTP_ERROR_404;
    }
  } catch (e) {
    throw HTTP_ERROR_401;
  }
}
