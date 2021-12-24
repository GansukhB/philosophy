const eventGenerator = require("../../testUtils/eventGenerator");
const handler = require("../../../endpoints/handler");
import connectDb from "../../../common/db";
import mongoose from "mongoose";
import { User } from "../../../common/models/User";
import { generateAccessToken } from "../../../common/jwt";
import { Follow } from "../../../common/models/FollowUser";

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
  test("Test user following own account", async () => {
    const event = eventGenerator({
      method: "post",
      pathParametersObject: {
        functionName: "follow",
      },
      body: {
        userId : testUser.userId
      },
      headers : {
        Authorization : accessToken
      }
    });
    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(404);

    const responseBody = JSON.parse(res.body);
    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe("not allowed request");
  })
  test("Test following user doesn't exist", async () => {
    let followingUserId = mongoose.Types.ObjectId();
    const event = eventGenerator({
      method: "post",
      pathParametersObject: {
        functionName: "follow",
      },
      body: {
        userId : followingUserId
      },
      headers : {
        Authorization : accessToken
      }
    });
    const followingUser = await User.findOne({
      _id: followingUserId,
    }).lean();
    const res = await handler.api(event, {});

    expect(followingUser).toBe(null);
    expect(res.statusCode).toBe(404);

    const responseBody = JSON.parse(res.body);
    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe("user not found");
  })
  afterAll(async () => {
    await User.deleteMany();
    await Follow.deleteMany();
    mongoose.connection.close();
  });
});
