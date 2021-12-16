const mongoose = require("mongoose");

const UserOtpSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      maxlength: 64,
      minlength: 2,
      required: true,
      index: true,
    },
    otp: {
      type: String,
      maxlength: 6,
      minlength: 6,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);
UserOtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 9000 }); //15 minutes to expire

let UserOtp;
try {
  UserOtp = mongoose.model("UserOtp");
} catch (e) {
  UserOtp = mongoose.model("UserOtp", UserOtpSchema);
}

export { UserOtp };
