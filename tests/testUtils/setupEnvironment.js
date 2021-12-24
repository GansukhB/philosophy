export default function () {
  if (!process.env.MONGODB_HOST) {
    process.env.MONGODB_HOST = "mongodb://127.0.0.1:27017/test";
  }
}
