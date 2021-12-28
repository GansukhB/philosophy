const eventGenerator = require("../../testUtils/eventGenerator");
const handler = require("../../../endpoints/handler");
import mongoose from "mongoose";
import { Topic } from "../../../common/models/Topic";
import {
	setupEnvironment,
	clearDatabase,
} from "../../testUtils/setupEnvironment";

describe("Test endpoint /endpoint/createTopic", () => {
	beforeAll(async () => {
		await setupEnvironment();
	});
	test("Test request without title of the topic", async () => {
		const event = eventGenerator({
			method: "post",
			pathParametersObject: {
				functionName: "createTopic",
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

// tuhain topic id bhgui ued ymr aldaa garah
// topic ni irehdee hedeer iruuleh
