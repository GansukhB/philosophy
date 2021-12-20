const eventGenerator = require("../../testUtils/eventGenerator");
const validators = require("../../testUtils/validators");
const handler = require("../../../endpoints/handler");

describe("Test endpoint /endpoint/userRegister", () => {
  test("It should return 200 status code", async () => {
    const event = eventGenerator({
      method: "post",
      body: {
        email: "test@test.test",
      },
      pathParametersObject: {
        functionName: "userRegister",
      },
    });

    const res = await handler.api(event);

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
  });
});
