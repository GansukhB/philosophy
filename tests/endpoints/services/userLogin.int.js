const handler = require("../../../endpoints/handler");
const dotenv = require("dotenv");
import EventGenerator from "../../testUtils/eventGenerator";
import { UserOtp } from "../../../common/models/UserOtp";
import { User } from "../../../common/models/User";
import {
  setupEnvironment,
  clearDatabase,
} from "../../testUtils/setupEnvironment";

describe("Test endpoint /endpoint/userLogin", () => {
  let user, userOtp;
  beforeAll(async () => {
    await setupEnvironment();
    user = await User.create({
      email: "test.login@gmail.com",
    });
    userOtp = await UserOtp.create({
      userId: user._id,
      otp: "123123",
    });
  });

  test("Test request without email or otp", async () => {
    const event = EventGenerator({
      method: "post",
      pathParametersObject: {
        functionName: "userLogin",
      },
    });

    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(201);

    const responseBody = JSON.parse(res.body);

    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe("Email or OTP is required");
  });
  test("Test request with invalid otp", async () => {
    const event = EventGenerator({
      method: "post",
      pathParametersObject: {
        functionName: "userLogin",
      },
      body: {
        email: "test.login@gmail.com",
        otp: "222222",
      },
    });

    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(400);

    const responseBody = JSON.parse(res.body);

    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe("invalid login");
  });
  test("Test request with valid otp", async () => {
    const event = EventGenerator({
      method: "post",
      pathParametersObject: {
        functionName: "userLogin",
      },
      body: {
        email: "test.login@gmail.com",
        otp: "123123",
      },
    });

    const res = await handler.api(event, {});

    expect(res).toBeDefined();

    const responseBody = JSON.parse(res.body);

    expect(responseBody).toBeDefined();
    expect(responseBody.accessToken).toBeDefined();
    expect(responseBody.refreshToken).toBeDefined();
    expect(res.statusCode).toBe(200);
  });
  test("Test request with non-existing user", async () => {
    const event = EventGenerator({
      method: "post",
      pathParametersObject: {
        functionName: "userLogin",
      },
      body: {
        email: "test.loginnon@gmail.com",
        otp: "111111",
      },
    });

    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(404);
  });

  afterAll(async () => {
    await clearDatabase();
  });
});
