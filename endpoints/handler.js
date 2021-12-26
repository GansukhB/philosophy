import { User } from "../common/models/User";
import generateResponse from "../common/response";
import userRegister from "./services/userRegister";
import userLogin from "./services/userLogin";
import requestOtp from "./services/requestOtp";
import requestToken from "./services/requestToken";

export async function api(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const functionName = event.pathParameters.functionName;

    if (functionName === "userRegister") {
      return await userRegister({ event });
    }
    if (functionName === "userLogin") {
      return await userLogin({ event });
    }

    if (functionName === "requestOtp") {
      return await requestOtp({ event });
    }

    if (functionName === "requestToken") {
      return await requestToken({ event });
    }
  } catch (error) {
    /* istanbul ignore next */
    return error;
  }
}
