const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    topicId: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      maxlength: 1000,
      required: true,
      index: true,
    },
    images: {
      type: [String],
      required: false,
    },
    comments: {
			type: [String],
    },
		commentCount: {
			type: Number,
			default: 0,
		},
		likes: {
			userId: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
		},
		likeCount: {
			type: Number,
			default: 0,
		},
		bookmarks: {
			userId: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
		},
		bookmarksId: {
			type: Number,
			default: 0,
		},
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

let Post;
try {
  Post = mongoose.model("User");
} catch (e) {
  Post = mongoose.model("User", PostSchema);
}

export { Post };