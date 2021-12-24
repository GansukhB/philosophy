const mongoose = require("mongoose");

const SubscribeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: false
        },
        topicId: {
            type: String,
            maxlength: 64,
            minlength: 2,
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
