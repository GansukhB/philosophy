const eventGenerator = require("../testUtils/eventGenerator");
const validators = require("../testUtils/validators");
const handler = require("../../handler");

describe("Test sample endpoint /hello", () => {
  test("It should return 200 status code", async () => {
    const event = eventGenerator({
      method: "get",
      body: {},
    });

    const res = await handler.hello(event);

    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
  });
  test("Property `message` should be in response", async () => {
    const event = eventGenerator({
      method: "get",
      body: {},
    });

    const res = await handler.hello(event);

    expect(res).toBeDefined();

    const responseBody = JSON.parse(res.body);
    expect(responseBody.message).toBeDefined();
    expect(responseBody.message).toBe(
      "Go Serverless v1.0! Your function executed successfully!"
    );
  });
});
