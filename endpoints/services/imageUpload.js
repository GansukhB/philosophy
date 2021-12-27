const AWS = require("aws-sdk");
var s3 = new AWS.S3();

import { HTTP_ERROR_400 } from "../../common/statuses";
import generateResponse from "../../common/response";

export default async function ({ event, context, callback }) {
  //   const requestBody = event && event.body ? JSON.parse(event.body) : {};
  //   console.log("requestBody", requestBody);

  try {
    const params = {
      Bucket: "philsophy-bucket",
      Body: JSON.stringify(event.body),
      Key: event.requestContext.requestId,
    };
    console.log("event", event);
    const result = await s3.putObject(params).promise();
    return result;
  } catch (error) {
    console.log(error);
    return generateResponse(200, {
      message: error,
    });
  }
}
