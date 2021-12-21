const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema(
  {
    followerId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,

    },
    followingId : {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

FollowSchema.index({ followerId: 1, followingId: 1 }, { unique: true })

let Follow;
try {
  Follow = mongoose.model("Follow");
} catch (e) {
    Follow = mongoose.model("Follow", FollowSchema);
}

export { Follow };
