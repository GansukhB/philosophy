import { User } from "../common/models/User";
import generateResponse from "../common/response";
import userRegister from "./services/userRegister";
import requestOtp from "./services/requestOtp";

export async function api(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const functionName = event.pathParameters.functionName;

    if (functionName === "userRegister") {
      return await userRegister({ event });
    }
     if (functionName === "requestOtp") {
       return await userRegister({ event });
     }
  } catch (error) {
    return error;
  }
}
