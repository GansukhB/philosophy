import { UserOtp } from "./models/UserOtp";
// OTP generator function should be created here
async function generateOtp() {
  // 6 оронтой тоо үүсгэх
  const generateCode = Math.floor(100000 + Math.random() * 900000);
  return generateCode; //үүсгэсэн 6 оронтой тоог буцаана.
}

async function generateOtpForUser(userId) {
  const otp = await generateOtp();
  //UserOpt моделийг ашиглан userotp collection-д
  await UserOtp.create({
    userId: userId,
    otp: otp,
  }); // байдлаар хадгална

  return otp; //
}

export { generateOtpForUser, generateOtp };
