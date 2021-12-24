import { Topic } from "../../common/models/Topic";
import { HTTP_ERROR_400 } from "../../common/statuses";
import connectDb from "../../common/db";
import generateResponse from "../../common/response";

export default async function ({ event }) {
	const requestBody = event && event.body ? JSON.parse(event.body) : {};

	try {
		await connectDb();
		const { name, description, coverImage, _id } = requestBody;

		try {
			const topicId = await Topic.findByIdAndUpdate("61c3d2a90ae8f0b7a6742dcf");
			topicId.name = name;
			topicId.description = description;
			topicId.coverImage = coverImage;

			topicId.save();

			console.log("changed topicId", topicId);
			return generateResponse(201, {
				message: "Topic updated",
			});
		} catch (e) {
			console.log("error during selecting from mongodb", e);
		}
	} catch (e) {
		console.log(e);
		throw HTTP_ERROR_400;
	}
}
