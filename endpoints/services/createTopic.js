import { Topic, User } from "../../common/models/Topic";
import { HTTP_ERROR_400 } from "../../common/statuses";
import connectDb from "../../common/db";
import generateResponse from "../../common/response";

export default async function ({ event }) {
	const requestBody = event && event.body ? JSON.parse(event.body) : {};
	try {
		await connectDb();
		const { name, description, coverImage, _id, createdBy } = requestBody;

		const topic = await Topic.create({
			name: name,
			description: description,
			createdBy: createdBy,
			coverImage: coverImage,
		});
        console.log("topic created by ==> ", topic.createdBy);
        
		return generateResponse(201, {
			message: "Topic created",
		});
	} catch (e) {
		console.log(e);
		throw HTTP_ERROR_400;
	}
}
