import responseGenerator from "../../common/response";
import setupTestEnv from "../testUtils/setupEnvironment";

setupTestEnv();

describe("Testing response generator", () => {
  test("Generate response with status code 200", async () => {
    const response = responseGenerator(200, {
      message: "test",
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers instanceof Object).toBe(true);
  });
  test("Testing response generator with default params ", async () => {
    const response = responseGenerator();
    expect(response.statusCode).toBe(502);
    expect(response.headers instanceof Object).toBe(true);
  });
});
