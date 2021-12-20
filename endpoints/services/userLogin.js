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
      const otpUser = await UserOtp.findOne({
        otp: otp,
      }).lean();

      console.log('otpUser', otpUser)
      
      if (!otpUser) {
        return generateResponse(400, {
          message: "invalid login",
        });
      }

      const loginUser = await User.findOne({ _id: otpUser.userId }).lean();

      console.log('loginUser', loginUser)

      if (loginUser) {
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
          console.log("error during genereting token", e);
          throw HTTP_ERROR_400;
        }
      }
    } catch (e) {
      console.log("error during selecting from mongodb", e);
      throw HTTP_ERROR_404;
    }
  } catch (e) {
    console.log("error during connecting to mongodb", e);
    throw HTTP_ERROR_400;
  }
}
