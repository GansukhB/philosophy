const eventGenerator = require("../../testUtils/eventGenerator");
const validators = require("../../testUtils/validators");
const handler = require("../../../endpoints/handler");
import mongoose from "mongoose";
import { User } from "../../../common/models/User";
import connectDb from "../../../common/db";

describe("Test endpoint /endpoint/userRegister", () => {
  beforeAll(async () => {
    //return new Promise((resolve) => {
    if (!process.env.CI)
      process.env.MONGODB_HOST = "mongodb://127.0.0.1:27017/test";
    await connectDb();
    await User.deleteMany();
  });
  test("Test request without email", async () => {
    const event = eventGenerator({
      method: "post",
      pathParametersObject: {
        functionName: "userRegister",
      },
    });
    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(400);

    const responseBody = JSON.parse(res.body);

    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe("Email is required.");
  });
  test("Test request with invalid email", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        email: "invalid.com",
      },
      pathParametersObject: {
        functionName: "userRegister",
      },
    });
    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(400);

    const responseBody = JSON.parse(res.body);

    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe("Invalid email address.");
  });
  test("Test register with valid email", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        email: "test@test.test",
      },
      pathParametersObject: {
        functionName: "userRegister",
      },
    });

    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(201);
  });

  test("Test duplicate user to register", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        email: "test@test.test",
      },
      pathParametersObject: {
        functionName: "userRegister",
      },
    });

    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(403);
  });
  afterAll(async () => {
    await User.deleteMany();

    mongoose.connection.close();
  });
});
