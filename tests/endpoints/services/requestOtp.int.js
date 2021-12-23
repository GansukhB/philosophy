const eventGenerator = require("../../testUtils/eventGenerator");
const handler = require("../../../endpoints/handler");
import { User } from "../../../common/models/User";
import mongoose from "mongoose";
//non existing email
//non requesting otp
describe("Test endpoint /endpoint/requestOtp", () => {
  beforeAll(async () => {
    if (!process.env.CI)
      process.env.MONGODB_HOST = "mongodb://127.0.0.1:27017/test";
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
    await User.deleteMany();

    mongoose.connection.close();
  });
});
