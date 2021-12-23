import { User } from "../../common/models/User";
import { HTTP_ERROR_400, HTTP_ERROR_403 } from "../../common/statuses";
import connectDb from "../../common/db";
import generateResponse from "../../common/response";
import sendEmail from "../../common/ses";
import { generateOtpForUser } from "../../common/generators";

export default async function ({ event }) {
  const requestBody = event && event.body ? JSON.parse(event.body) : {};
  try {
    await connectDb();
    const email = requestBody.email;
    if (!email) {
      // Email validation regex will be created soon!
      return generateResponse(400, {
        message: "Email is required",
      });
    }
    try {
      const existingUser = await User.findOne({
        email: email,
      }).lean();

      // If user with given email exists, It will send OTP and return 200
      if (existingUser) {
        const otp = await generateOtpForUser(existingUser._id);
        let emailResponse;
        /* istanbul ignore next */

        emailResponse = await sendEmail({
          to: existingUser.email,
          from: process.env.EMAIL_SENDER,
          subject: "Таны нэг удаагийн нууц үг",
          text: `Таны удаагийн нууц үг: ${otp}`,
        });
        /* istanbul ignore next */
        if (emailResponse) {
          return generateResponse(200, {
            message: "email sent",
          });
        } else {
          /* istanbul ignore next */
          return generateResponse(501, {
            message: "Couldn't send email",
          });
        }
      } else {
        return generateResponse(400, {
          message: "user doesnt exists",
        });
      }
    } catch (e) {
      /* istanbul ignore next */
      console.log("error during selecting from mongodb", e);
    }
  } catch (e) {
    /* istanbul ignore next */
    console.log(e);
    /* istanbul ignore next */
    throw HTTP_ERROR_400;
  }
}
