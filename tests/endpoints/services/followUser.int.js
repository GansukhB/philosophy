const eventGenerator = require("../../testUtils/eventGenerator");
const handler = require("../../../endpoints/handler");
import connectDb from "../../../common/db";
import mongoose from "mongoose";
import { User } from "../../../common/models/User";
import requestOtp from "../../../endpoints/services/requestOtp";
import userLogin from "../../../endpoints/services/userLogin";
import { UserOtp } from "../../../common/models/UserOtp";
import { generateAccessToken } from "../../../common/jwt";

describe("Test endpoint /endpoint/follow", () => {
  let testUser, testUserTwo, accessToken;
  beforeAll(async () => {
    if (!process.env.CI) {
      process.env.MONGODB_HOST = "mongodb://127.0.0.1:27017/test";
    }
    process.env.JWT_SECRET = "ast";
    await connectDb();
    await User.deleteMany();
    testUser = await User.create({
      email: "test@test.test",
    });
    testUser = testUser.toObject();
    testUser.userId = testUser._id.toString();
    testUserTwo = await User.create({
      email: "testTwo@test.test",
    });
    testUserTwo = testUserTwo.toObject();
    testUserTwo.userId = testUserTwo._id.toString();
    accessToken = generateAccessToken(testUser);
  });
  test("Test request without userId", async () => {
    const event = eventGenerator({
      method: "post",
      pathParametersObject: {
        functionName: "follow",
      },
      body: {
        // userId : testUserTwo.userId
      },
      headers: {
        Authorization: accessToken,
      },
    });
    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(400);
  });

  test("Test follow user valid userId", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        userId: testUserTwo.userId,
      },
      headers: {
        Authorization: accessToken,
      },
      pathParametersObject: {
        functionName: "follow",
      },
    });

    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);

    const responseBody = JSON.parse(res.body);
    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe("followed");
  });
  // test("Test following user is exist", async () => {
  //   const event = eventGenerator({
  //     method: "post",
  //     pathParametersObject: {
  //       functionName: "follow",
  //     },
  //     body: {
  //       userId : testUserTwo.userId
  //     },
  //     headers : {
  //       Authorization : accessToken
  //     }
  //   });
  // })
  afterAll(async () => {
    await User.deleteMany();

    mongoose.connection.close();
  });
});
