import { setupEnvironment, clearDatabase } from "../testUtils/setupEnvironment";
const eventGenerator = require("../testUtils/eventGenerator");

import {
  generateAccessToken,
  generateRefreshToken,
  verify,
} from "../../common/jwt";

describe("Unit testing for jwt token", () => {
  let accessToken, refreshToken;
  beforeAll(async () => {
    await setupEnvironment();
  });
  test("Testing generateToken function", async () => {
    accessToken = generateAccessToken({ email: "test@test.test" });
    expect(typeof accessToken).toBe("string");
  });
  test("Testing generateToken function", async () => {
    refreshToken = generateRefreshToken({ email: "test@test.test" });
    expect(typeof refreshToken).toBe("string");
  });
  test("Testing access token verify", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        email: "no-exist@test.com",
      },
      headers: {
        Authorization: accessToken,
      },
      pathParametersObject: {
        functionName: "test",
      },
    });
    const user = verify(event);
    expect(user).toBeDefined();
    expect(typeof user).toBe("object");
  });

  test("Testing access token verify", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        email: "no-exist@test.com",
      },
      headers: {
        Authorization: accessToken,
      },
      pathParametersObject: {
        functionName: "test",
      },
    });
    const user = verify(event);
    expect(user).toBeDefined();
    expect(typeof user).toBe("object");
  });

  test("Testing refresh token verify", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        email: "no-exist@test.com",
      },
      headers: {
        Authorization: refreshToken,
      },
      pathParametersObject: {
        functionName: "test",
      },
    });
    const user = verify(event, "refresh");
    expect(user).toBeDefined();
    expect(typeof user).toBe("object");
  });

  test("Testing invalid access token", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        email: "no-exist@test.com",
      },
      headers: {
        Authorization: "invalid token",
      },
      pathParametersObject: {
        functionName: "test",
      },
    });
    const response = verify(event);
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(403);
  });

  test("Testing invalid refresh token", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        email: "no-exist@test.com",
      },
      headers: {
        Authorization: "invalid token",
      },
      pathParametersObject: {
        functionName: "test",
      },
    });
    const response = verify(event, "refresh");
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(403);
  });
  test("Testing verify function without token", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        email: "no-exist@test.com",
      },
      pathParametersObject: {
        functionName: "test",
      },
    });
    expect(() => {
      verify(event);
    }).toThrow(Object);
  });

  afterAll(async () => {
    clearDatabase();
  });
});
