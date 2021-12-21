const AWS = require("aws-sdk");
var s3 = new AWS.S3();

import { HTTP_ERROR_400 } from "./statuses";
//if there is no bucket create bucket
// Profile and post picture will be in separated folder (create folder path parameter)
//see aws oregon infra-face-detection lambda function
//Key is the how to file upload and using putObject


export default async function ({path, image}){

    if (!path || !image) {
        throw HTTP_ERROR_400;
    }
    var params = {Bucket: 'philsophy-bucket', Key:`${path}/${image}`};
    try {
      const url =  await s3.getSignedUrl('pubObject', params).promise();
        return url;
    } catch (error) {
        console.log("error uploading ", error);
        return false;
    }

}