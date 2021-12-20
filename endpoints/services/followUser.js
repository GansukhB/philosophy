import { Follow } from "../../common/models/FollowUser";
import { HTTP_ERROR_400, HTTP_ERROR_403 } from "../../common/statuses";
import connectDb from "../../common/db";
import { User } from "../../common/models/User";
import generateResponse from "../../common/response";
import { verify } from "../../common/jwt";

export default async function ({event}) {
    const requestBody = event && event.body ? JSON.parse(event.body) : {};
    try {
        await connectDb();
        const currentUser = verify(event);
        console.log(currentUser._id);
        const { userId } = requestBody
        try {
            const userIsExist = await User.findOne({
              _id: userId,
            }).lean();
      
            if(!userIsExist) {
                return generateResponse(404, {
                    message: "user not found",
                  });
            }

          } catch (e) {
            console.log("error during selecting from mongodb", e);
          }        
    } catch (e) {
        console.log(e);
        throw HTTP_ERROR_400;
    }
    console.log(requestBody)
}
