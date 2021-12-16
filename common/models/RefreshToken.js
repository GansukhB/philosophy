const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      maxlength: 2000,
      index: true,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);
RefreshTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1209600 }); //14 days to expire refresh tokens

let RefreshToken;
try {
  RefreshToken = mongoose.model("RefreshToken");
} catch (e) {
  RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
}

export { RefreshToken };
