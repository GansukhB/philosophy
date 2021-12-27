import { Subscribe } from "../../common/models/Subscription"
import connectDb from "../../common/db"
import generateResponse from "../../common/response"
import { HTTP_ERROR_400, HTTP_ERROR_403 } from "../../common/statuses";
import { verify } from "../../common/jwt";
import { Subscribe } from "../../common/models/";
import { ObjectId } from "mongodb";

export default async function ({ event }) {
    const requestBody = event && event.body ? JSON.parse(event.body) : {};
    console.log("Id: ", ObjectId(requestBody.topicId));

    try {
        await connectDb();
        const topicId = requestBody.topicId;
        const currentUser = verify(event, "access");

        /// 61c3da479eb6adf2f3d4644d
        // topic.findOne({
        //     topicId: requestBody.topicId
        // })
        try {
            const existingTopic = await topics.findOne({
                _id: topicId
            }).lean()
            if (existingTopic) {
                try {
                    await Subscribe.create({
                        topicId: topicId,
                        userId: currentUser.userId
                    })
                }
                catch (e) {
                    return generateResponse(400, {
                        message: "failed to subscribe to topic"
                    })
                }
                return generateResponse(201, {
                    message: "subscribed to topic"
                })
            }
            else {
                return generateResponse(404, {
                    message: "topic is not found"
                })
            }
        }
        catch (e) {
            return (generateResponse(404, {
                message: "topic is not found!!"
            }))
        }

    } catch (e) {
        console.log(e);
        throw HTTP_ERROR_400;
    }
}

