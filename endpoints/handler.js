import generateResponse from "../common/response";
import userRegister from "./services/userRegister";
import userLogin from "./services/userLogin";
import requestOtp from "./services/requestOtp";
import requestToken from "./services/requestToken";
import profileUpdate from "./services/profileUpdate";
import followUser from "./services/followUser";
import unfollowUser from "./services/unfollowUser";
import createTopic from "./services/createTopic";
import topicUpdate from "./services/topicUpdate";
import topicGet from "./services/topicGet";
import topicList from "./services/topicList";

export async function api(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const functionName = event.pathParameters.functionName;

    switch (functionName) {
      case "userRegister":
        return await userRegister({ event });
      case "userLogin":
        return await userLogin({ event });
      case "requestOtp":
        return await requestOtp({ event });
      case "requestToken":
        return await requestToken({ event });
      case "me":
        return await profileUpdate({ event });
      case "follow":
        return await followUser({ event });
      case "unfollow":
        return await unfollowUser({ event });
      case "createTopic":
        return await createTopic({ event });
      case "topicUpdate":
        return await topicUpdate({ event });
      case "topicGet":
        return await topicGet({ event });
      case "topicList":
        return await topicList({ event });
      default:
        return generateResponse(404, {
          message: "not found",
        });
    }
  } catch (error) {
    /* istanbul ignore next */
    return error;
  }
}
