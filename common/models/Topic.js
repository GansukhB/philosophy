const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			maxlength: 64,
			required: true,
			index: true,
		},
		description: {
			type: String,
			maxlength: 255,
			index: true,
		},
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		coverImage: {
			type: String,
			maxlength: 1000,
		},
	},
	{ timestamps: true }
);

let Topic;
try {
	Topic = mongoose.model("Topic");
} catch (e) {
	Topic = mongoose.model("Topic", TopicSchema);
}

export { Topic };
