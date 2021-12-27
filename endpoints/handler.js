import generateResponse from "../common/response";
import userRegister from "./services/userRegister";
import userLogin from "./services/userLogin";
import requestOtp from "./services/requestOtp";
import requestToken from "./services/requestToken";
import profileUpdate from "./services/profileUpdate";
import followUser from "./services/followUser";
import imageUpload from "./services/imageUpload";

export async function api(event, context, callback) {
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
      default:
        return generateResponse(404, {
          message: "not found",
        });
    }
    if (functionName === "imageUpload") {
      return await imageUpload({ event, context, callback });
    }
  } catch (error) {
    /* istanbul ignore next */
    return error;
  }
}
