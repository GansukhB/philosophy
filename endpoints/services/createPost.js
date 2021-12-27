import { Post } from "../../common/models/Post";
import { HTTP_ERROR_400, HTTP_ERROR_404 } from "../../common/statuses";
import connectDb from "../../common/db";
import generateResponse from "../../common/response";

export default async function ({ event }) {
  const requestBody = event && event.body ? JSON.parse(event.body) : {};

  try {
    await connectDb();
		const currentUser = verify(event);
    const topicId = requestBody.topicId;
    const body = requestBody.body;
    const images = requestBody.images;
		if (currentUser.userId) {
			// userId needs to be verified
			return generateResponse(400, {
				message: "You need to be logged in",
			});
		}
    if(!topicId){
			//topicId is optional
			return generateResponse(404, {
				message: "topicId doesn't exist",
			})
    }
		if(body.length > 1000){
			//topicId is optional
			return generateResponse(400, {
				message: "The post body's length over 1000",
			})
    }
    await Post.create({
      topicId: topicId,
			body: body,
			images: images,
    });
    return generateResponse(201, {
      message: "Post created",
    });
  } catch (e) {
    /* istanbul ignore next */
    console.log(e);
    /* istanbul ignore next */
    throw HTTP_ERROR_400;
  }
}