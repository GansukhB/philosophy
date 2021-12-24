const AWS = require("aws-sdk");
const SES = new AWS.SES();

import { HTTP_ERROR_400 } from "./statuses";

/* istanbul ignore next */
export default async function ({
  to,
  from = "philosophy.mn@gmail.com",
  subject,
  text,
}) {
  if (!to || !from || !subject || !text) {
    throw HTTP_ERROR_400;
  }
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: text },
      },
      Subject: { Data: subject },
    },
    Source: from,
  };

  try {
    if (process.env.NODE_ENV !== "test") await SES.sendEmail(params).promise();
    return true;
  } catch (error) {
    console.log("error sending email ", error);
    return false;
  }
}
