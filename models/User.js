const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required for registration"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required for registration"],
    },
    password: {
      type: String,
      required: [true, "Password is required for registration"],
    },
    role: {
      type: String,
    },
    tokens: [String], 
    likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    publishedPostsIds: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    commentedPostsIds: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.tokens;
  delete user.password;
  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

