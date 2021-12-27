const eventGenerator = require("../../testUtils/eventGenerator");
const handler = require("../../../endpoints/handler");
import mongoose from "mongoose";
import { User } from "../../../common/models/User";
import { generateAccessToken } from "../../../common/jwt";
import {
  setupEnvironment,
  clearDatabase,
} from "../../testUtils/setupEnvironment";

describe("Test endpoint /endpoint/unfollow", () => {
  let testUser, testUserTwo, accessToken;
  beforeAll(async () => {
    await setupEnvironment();
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
        functionName: "unfollow",
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

  test("Test unfollow user valid userId", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        userId: testUserTwo.userId,
      },
      headers: {
        Authorization: accessToken,
      },
      pathParametersObject: {
        functionName: "unfollow",
      },
    });

    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);

    const responseBody = JSON.parse(res.body);
    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe("unfollowed");
  });
  test("Test user unfollowing own account", async () => {
    const event = eventGenerator({
      method: "post",
      pathParametersObject: {
        functionName: "unfollow",
      },
      body: {
        userId: testUser.userId,
      },
      headers: {
        Authorization: accessToken,
      },
    });
    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(400);

    const responseBody = JSON.parse(res.body);
    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe("not allowed request");
  });
  test("Test unfollowing user doesn't exist", async () => {
    let unfollowingUserId = mongoose.Types.ObjectId();
    const event = eventGenerator({
      method: "post",
      pathParametersObject: {
        functionName: "unfollow",
      },
      body: {
        userId: unfollowingUserId,
      },
      headers: {
        Authorization: accessToken,
      },
    });
    const unfollowingUser = await User.findOne({
      _id: unfollowingUserId,
    }).lean();
    const res = await handler.api(event, {});

    expect(unfollowingUser).toBe(null);
    expect(res.statusCode).toBe(404);

    const responseBody = JSON.parse(res.body);
    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe("user not found");
  });
  afterAll(async () => {
    await clearDatabase();
  });
});
