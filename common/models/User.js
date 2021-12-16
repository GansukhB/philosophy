const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 64,
      minlength: 2,
      required: false,
      sparse: true,
    },
    email: {
      type: String,
      maxlength: 64,
      minlength: 6,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      maxlength: 255,
      minlength: 6,
      required: false,
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

let User;
try {
  User = mongoose.model("User");
} catch (e) {
  User = mongoose.model("User", UserSchema);
}

export { User };
