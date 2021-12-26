import { User } from "../../common/models/User";
import { HTTP_ERROR_400 } from "../../common/statuses";
import connectDb from "../../common/db";
import generateResponse from "../../common/response";
import { verify } from "../../common/jwt";

export default async function ({ event }) {
  const requestBody = event && event.body ? JSON.parse(event.body) : {};

  try {
    await connectDb();

    const name = requestBody.name;
    const avatar = requestBody.avatar;
    if (!name && !avatar) {
      return generateResponse(400, {
        message: "Name or Avatar is required",
      });
    }

    try {
      const currentUser = verify(event);

      try {
        await User.findOneAndUpdate({ _id: currentUser.userId }, requestBody);
        return generateResponse(200, {
          message: "Successfully updated",
        });
      } catch (e) {
        /* istanbul ignore next */
        console.log("error during updating user", e);
        /* istanbul ignore next */
        throw HTTP_ERROR_400;
      }
    } catch (e) {
      /* istanbul ignore next */
      console.log("error during verifying access token", e);
      /* istanbul ignore next */
      throw HTTP_ERROR_400;
    }
  } catch (e) {
    /* istanbul ignore next */
    console.log("error during connecting to mongodb", e);
    /* istanbul ignore next */
    throw HTTP_ERROR_400;
  }
}
