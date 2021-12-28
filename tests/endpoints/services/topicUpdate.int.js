const eventGenerator = require("../../testUtils/eventGenerator");
const handler = require("../../../endpoints/handler");
import mongoose from "mongoose";
import { Topic } from "../../../common/models/Topic";
import connectDb from "../../../common/db";

describe("Test endpoint /endpoint/topicUpdate", () => {
	beforeAll(async () => {
		if (!process.env.CI)
			process.env.MONGODB_HOST = "mongodb://127.0.0.1:27017/test";
		await connectDb();
		await Topic.deleteMany();
	});
	test("Test request without title of the topic", async () => {
		const event = eventGenerator({
			method: "post",
			pathParametersObject: {
				functionName: "topicUpdate",
			},
		});
		const res = await handler.api(event, {});

		expect(res).toBeDefined();
		expect(res.statusCode).toBe(400);

		const responseBody = JSON.parse(res.body);
		console.log("responseBody => ", responseBody);

		expect(responseBody.message).toBeDefined();
		expect(responseBody.message).toBe("Title is required");
	});
	afterAll(async () => {
		await Topic.deleteMany();
		mongoose.connection.close();
	});
});
