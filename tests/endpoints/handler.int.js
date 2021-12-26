const eventGenerator = require("../testUtils/eventGenerator");
const handler = require("../../endpoints/handler");

describe("Test invalid endpoint /hi", () => {
  test("It should return 200 status code", async () => {
    const event = eventGenerator({
      method: "get",
      body: {},
      pathParametersObject: {
        functionName: "hi",
      },
    });

    const res = await handler.api(event, {});

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(404);
  });
});
