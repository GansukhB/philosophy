export default function () {
  if (!process.env.MONGODB_HOST) {
    process.env.MONGODB_HOST = "mongodb://127.0.0.1/test";
  } else {
    console.log(process.env.MONGODB_HOST);
  }
}
