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
  test("Test profile update", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        name: "Name",
        avatar: "avatar",
      },
      headers: {
        Authorization: accessToken,
      },
      pathParametersObject: {
        functionName: "me",
      },
    });
    const res = await handler.api(event, {});
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
  });

  test("Test profile update with invalid body", async () => {
    const event = eventGenerator({
      method: "post",
      headers: {
        Authorization: accessToken,
      },
      pathParametersObject: {
        functionName: "me",
      },
    });
    const res = await handler.api(event, {});
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(400);
  });

  afterAll(async () => {
    await clearDatabase();
  });
});
