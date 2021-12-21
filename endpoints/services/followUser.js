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
        const { userId } = requestBody
        const currentUser = verify(event, "access");
        try {
            const followingUser = await User.findOne({
              _id: userId,
            }).lean();
            if(followingUser._id == currentUser.userId) {
              return generateResponse(404, {
                message: "not allowed request",
              });
            }
            if(!followingUser) {
                return generateResponse(404, {
                    message: "user not found",
                  });
            }
            try {
                if(currentUser) {
                  try {
                    await Follow.create({
                      followerId : currentUser.userId,
                      followingId : followingUser._id
                    })
                  } catch(e) {
                    return generateResponse(200, {
                      message: "followed",
                    }); 
                  }
                return generateResponse(200, {
                  message: "followed",
                });
              }
            } catch (e) {
              console.log("update user data failed",e)
            }
          } catch (e) {
            console.log("error during selecting from mongodb", e);
          }        
    } catch (e) {
        console.log(e);
        throw HTTP_ERROR_400;
    }
}
