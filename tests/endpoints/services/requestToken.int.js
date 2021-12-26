const eventGenerator = require("../../testUtils/eventGenerator");
const handler = require("../../../endpoints/handler");
import { User } from "../../../common/models/User";
import { generateAccessToken, generateRefreshToken } from "../../../common/jwt";
import {
  setupEnvironment,
  clearDatabase,
} from "../../testUtils/setupEnvironment";

describe("Test endpoint /endpoint/requestToken", () => {
  var testUser, accessToken, refreshToken;
  beforeAll(async () => {
    await setupEnvironment();
    testUser = await User.create({
      email: "test@test.test",
    });
    accessToken = generateAccessToken({ email: "test@test.test" });
    refreshToken = generateRefreshToken({ email: "test@test.test" });
  });
  test("Test request valid refresh token in body ", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        token: refreshToken,
      },
      pathParametersObject: {
        functionName: "requestToken",
      },
    });
    const res = await handler.api(event, {});
    expect(res).toBeDefined();

    const responseBody = JSON.parse(res.body);
    expect(responseBody.accessToken).toBeDefined();
  });

  test("Test request token with non existing user ", async () => {
    const token = generateRefreshToken({ email: "non-existing@test.test" });
    const event = eventGenerator({
      method: "post",
      body: {
        token: token,
      },
      pathParametersObject: {
        functionName: "requestToken",
      },
    });
    const res = await handler.api(event, {});
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(401);
  });

  afterAll(async () => {
    await clearDatabase();
  });
});
