const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema(
  {
    followerId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    followingId : {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        unique: true,
    },
  },
  {
    timestamps: true,
  }
);

let Follow;
try {
  Follow = mongoose.model("User");
} catch (e) {
    Follow = mongoose.model("User", FollowSchema);
}

export { Follow };
