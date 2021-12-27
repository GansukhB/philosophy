const mongoose = require("mongoose");

const SubscribeSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        topicId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }

);

let Subscribe;
try {
    Subscribe = mongoose.model("Subscribe");
} catch (e) {
    Subscribe = mongoose.model("Subscribe", SubscribeSchema);
}

export { Subscribe };
