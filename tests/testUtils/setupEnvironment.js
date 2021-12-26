import mongoose from "mongoose";
import connectDb from "../../common/db";
import { User } from "../../common/models/User";
import { UserOtp } from "../../common/models/UserOtp";
import { Follow } from "../../common/models/FollowUser";

async function setupEnvironment() {
  if (!process.env.MONGODB_HOST) {
    process.env.MONGODB_HOST = "mongodb://127.0.0.1:27017/test";
  }
  if (!process.env.CI)
    process.env.MONGODB_HOST = "mongodb://127.0.0.1:27017/test";

  process.env.JWT_REFRESH_TOKEN_SECRET = "asdasdf";
  process.env.JWT_SECRET = "asd";

  await connectDb();
  await User.deleteMany();
  await UserOtp.deleteMany();
  await Follow.deleteMany();
}

async function clearDatabase() {
  await User.deleteMany();
  await UserOtp.deleteMany();
  await Follow.deleteMany();

  mongoose.connection.close();
}
export { setupEnvironment, clearDatabase };
