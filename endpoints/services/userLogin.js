import { User } from "../../common/models/User";
import { UserOtp } from "../../common/models/UserOtp";
import { HTTP_ERROR_400, HTTP_ERROR_403 } from "../../common/statuses";
import connectDb from "../../common/db";
import generateResponse from "../../common/response";
import { generateAccessToken, generateRefreshToken } from "../../common/jwt";

export default async function ({ event }) {
  const requestBody = event && event.body ? JSON.parse(event.body) : {};

  try {
    await connectDb();

    const email = requestBody.email;
    const otp = requestBody.otp;
    if (!email || !otp) {
      return generateResponse(201, {
        message: "Email or OTP is required",
      });
    }

    try {
      const loginUser = await User.findOne({
        email: email,
      }).lean();

      if (!loginUser) {
        return generateResponse(404, {
          message: "User not found",
        });
      }

      const userOtp = await UserOtp.findOne({
        userId: loginUser._id,
        otp: otp,
      }).lean();
      if (userOtp) {
        try {
          const accessToken = generateAccessToken({
            email: loginUser.email,
            userId: loginUser._id,
          });
          const refreshToken = await generateRefreshToken({
            email: loginUser.email,
            userId: loginUser._id,
          });

          return generateResponse(200, {
            accessToken,
            refreshToken,
          });
        } catch (e) {
          /*istanbul ignore next */
          console.log("error during genereting token", e);
          /*istanbul ignore next */
          throw HTTP_ERROR_400;
        }
      } else {
        return generateResponse(400, {
          message: "invalid login",
        });
      }
    } catch (e) {
      /*istanbul ignore next */
      console.log("error during selecting from mongodb", e);
      /*istanbul ignore next */
      throw HTTP_ERROR_404;
    }
  } catch (e) {
    /*istanbul ignore next */
    console.log("error during connecting to mongodb", e);
    /*istanbul ignore next */
    throw HTTP_ERROR_400;
  }
}
