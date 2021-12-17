import responseGenerator from "../../common/response";

describe("Testing response generator", () => {
  test("Generate response with status code 200", async () => {
    const response = responseGenerator(200, {
      message: "test",
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers instanceof Object).toBe(true);
  });
});
