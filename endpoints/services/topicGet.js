import { Topic } from "../../common/models/Topic";
import { HTTP_ERROR_400 } from "../../common/statuses";
import connectDb from "../../common/db";
import generateResponse from "../../common/response";

export default async function ({ event }) {
	const requestBody = event && event.body ? JSON.parse(event.body) : {};

	try {
		await connectDb();
		// const id = requestBody._id;
		const id = "61c3d2a90ae8f0b7a6742dcf";

		const topic = await Topic.findOne({
			_id: id,
		});
		console.log("topic ==> ", topic);

		return generateResponse(201, {
			message: "Here is the single topic",
		});
	} catch (e) {
		console.log("error during get topic from mongodb", e);
		throw HTTP_ERROR_400;
	}
}
