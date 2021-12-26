import { Follow } from "../../common/models/FollowUser";
import { HTTP_ERROR_400 } from "../../common/statuses";
import connectDb from "../../common/db";
import { User } from "../../common/models/User";
import generateResponse from "../../common/response";
import { verify } from "../../common/jwt";

export default async function ({ event }) {
  const requestBody =
    event && event.body
      ? JSON.parse(event.body)
      : /* istanbul ignore next */ {};
  const { userId } = requestBody;
  if (userId) {
    try {
      await connectDb();
      const currentUser = verify(event);
      const followingUser = await User.findOne({
        _id: userId,
      }).lean();
      if (!followingUser) {
        return generateResponse(404, {
          message: "user not found",
        });
      }
      if (followingUser._id == currentUser.userId) {
        return generateResponse(400, {
          message: "not allowed request",
        });
      }
      try {
        await Follow.create({
          followerId: currentUser.userId,
          followingId: followingUser._id,
        });
      } catch (e) {
        /* istanbul ignore next */
        return generateResponse(200, {
          message: "followed",
        });
      }
      return generateResponse(200, {
        message: "followed",
      });
    } catch (e) {
      /* istanbul ignore next*/
      console.log(e);
      /* istanbul ignore next*/
      throw HTTP_ERROR_400;
    }
  }
  return generateResponse(400);
}
