import { Topic } from "../../common/models/Topic";
import { HTTP_ERROR_400 } from "../../common/statuses";
import connectDb from "../../common/db";
import generateResponse from "../../common/response";

export default async function ({ event }) {
	const requestBody = event && event.body ? JSON.parse(event.body) : {};
	try {
		await connectDb();
		const { title, description, coverImage, _id, createdBy } = requestBody;

		if (!title) {
			return generateResponse(400, {
				message: "Title is required",
			});
		}
		
		const topic = await Topic.create({
			title: title,
			description: description,
			createdBy: createdBy,
			coverImage: coverImage,
		});

		return generateResponse(201, {
			message: "Topic created",
		});
	} catch (e) {
		console.log(e);
		throw HTTP_ERROR_400;
	}
}
