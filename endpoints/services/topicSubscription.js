import { Subscribe } from "../../common/models/Subscription"
import connectDb from "../../common/db"
import generateResponse from "../../common/response"
import { HTTP_ERROR_400, HTTP_ERROR_403 } from "../../common/statuses";

export default async function ({ event }) {
    console.log("eventBody=======>", event.body);
    const requestBody = event && event.body ? JSON.parse(event.body) : {};

    try {
        await connectDb();
        const topicId = requestBody.topicId;
        const followTopic = await Subscribe.create({
            topicId: topicId,
        })
        console.log(followTopic);
        return generateResponse(201, {
            message: "TopicIDCreated"
        })
    } catch (e) {
        console.log(e);
        throw HTTP_ERROR_400;
    }
}

