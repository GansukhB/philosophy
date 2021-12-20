import { User } from "../common/models/User";
import generateResponse from "../common/response";
import userRegister from "./services/userRegister";
import userLogin from "./services/userLogin";
import requestOtp from "./services/requestOtp";
import requestToken from "./services/requestToken";
import profileUpdate from "./services/profileUpdate";
import followUser from "./services/followUser";

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
    if (functionName === "me") {
      return await profileUpdate({ event });
    }
    if (functionName === "follow") {
      return await followUser({ event });
    }
  } catch (error) {
    return error;
  }
}
