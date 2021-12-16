import { User } from "../../common/models/User";
import { HTTP_ERROR_400, HTTP_ERROR_403 } from "../../common/statuses";
import connectDb from "../../common/db";
import generateResponse from "../../common/response";
import sendEmail from "../../common/ses";

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

      // If user with given email exists, it should return 403
      if (existingUser) {
        return generateResponse(403, {
          message: "User exists",
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