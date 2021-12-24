import { Topic } from "../../common/models/Topic";
import { HTTP_ERROR_400 } from "../../common/statuses";
import connectDb from "../../common/db";
import generateResponse from "../../common/response";

export default async function ({ event }) {
	try {
		await connectDb();
		const page = event.queryStringParameters.page;
		const perPage = event.queryStringParameters.per_page;
		const topicList = await Topic.find().skip(5).limit(perPage);
		const count = 0;

		return generateResponse(201, {
			count: count,
			result: topicList,
			page: page,
			perPage: perPage,
			hasNextPage: topicList.length == perPage,
		});
	} catch (e) {
		console.log("error during selecting from mongodb", e);
		throw HTTP_ERROR_400;
	}
}
