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
      return generateResponse(201, {
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
        const emailResponse = await sendEmail({
          to: existingUser.email,
          from: process.env.EMAIL_SENDER,
          subject: "Таны нэг удаагийн нууц үг",
          text: `Таны удаагийн нууц үг: ${otp}`,
        });
        if (emailResponse) {
          return generateResponse(200, {
            message: "email sent",
          });
        } else {
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
      console.log("error during selecting from mongodb", e);
    }

    const user = await User.create({
      email: email,
    });
    const to = user.email;
    const from = "bganaa2009@gmail.com";
    const subject = "Email хаяг баталгаажуулах код";
    const text = "text"; // Generated OTP must be sent
    try {
      await sendEmail({ to, from, subject, text });
    } catch (e) {
      console.log("error email", e);
    }
    return generateResponse(201, {
      message: "User created",
    });
  } catch (e) {
    console.log(e);
    throw HTTP_ERROR_400;
  }
}
