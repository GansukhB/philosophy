import connectDb from "../../common/db";
import { verify, generateAccessToken } from "../../common/jwt";
import { User } from "../../common/models/User";
import generateResponse from "../../common/response";
import {
  HTTP_ERROR_401,
  HTTP_ERROR_403,
  HTTP_ERROR_404,
} from "../../common/statuses";

export default async function ({ event }) {
  try {
    await connectDb();
    // token --> using access token, just now...
    // check refresh token is valid
    const result = verify(event, "refresh");
    const email = result.email;

    // if user's refresh token is expired
    /* istanbul ignore next */
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
        return generateResponse(200, { accessToken: accessToken });
      } else {
        /* istanbul ignore next */
        throw HTTP_ERROR_401;
      }
    } catch (e) {
      /* istanbul ignore next */
      //console.log("invalid user", e);
      /* istanbul ignore next */
      throw HTTP_ERROR_404;
    }
  } catch (e) {
    /* istanbul ignore next */
    throw HTTP_ERROR_401;
  }
}
