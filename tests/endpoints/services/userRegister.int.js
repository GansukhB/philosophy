const eventGenerator = require("../../testUtils/eventGenerator");
const validators = require("../../testUtils/validators");
const handler = require("../../../endpoints/handler");

import {
  setupEnvironment,
  clearDatabase,
} from "../../testUtils/setupEnvironment";

describe("Test endpoint /endpoint/userRegister", () => {
  beforeAll(async () => {
    await setupEnvironment();
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
    await clearDatabase();
  });
});
