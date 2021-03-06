const eventGenerator = require("../../testUtils/eventGenerator");
const handler = require("../../../endpoints/handler");
import { User } from "../../../common/models/User";
import { UserOtp } from "../../../common/models/UserOtp";
import connectDb from "../../../common/db";

import {
  setupEnvironment,
  clearDatabase,
} from "../../testUtils/setupEnvironment";
//non existing email
//non requesting otp
describe("Test endpoint /endpoint/requestOtp", () => {
  var testUser;
  beforeAll(async () => {
    await setupEnvironment();
    testUser = await User.create({
      email: "test@test.test",
    });
  });
  test("Test request send email ", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        email: testUser.email,
      },
      pathParametersObject: {
        functionName: "requestOtp",
      },
    });
    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);

    const responseBody = JSON.parse(res.body);

    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe("email sent");
    const userOtp = await UserOtp.findOne({
      userId: testUser._id,
    });
    expect(userOtp).toBeDefined();
    expect(userOtp).not.toBe(null);
  });
  test("Test request non-existing body ", async () => {
    const event = eventGenerator({
      method: "post",
      pathParametersObject: {
        functionName: "requestOtp",
      },
    });
    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(400);

    const responseBody = JSON.parse(res.body);

    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe("Email is required");
  });
  test("Test request non-existing email ", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        email: "no-exist@test.com",
      },
      pathParametersObject: {
        functionName: "requestOtp",
      },
    });
    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(400);

    const responseBody = JSON.parse(res.body);

    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe("user doesnt exists");
  });
  afterAll(async () => {
    await clearDatabase();
  });
});
