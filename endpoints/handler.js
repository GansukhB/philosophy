import generateResponse from "../common/response";
import userRegister from "./services/userRegister";
import userLogin from "./services/userLogin";
import requestOtp from "./services/requestOtp";
import requestToken from "./services/requestToken";

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
