export async function apiService(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const functionName = event.pathParameters.functionName;

    if (functionName === "login") {
      return await login({ event });
    }
    if (functionName === "token") {
      return await token({ event });
    }
  } catch (error) {
    return error;
  }
}
