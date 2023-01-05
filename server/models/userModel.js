import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  nickname: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  imageurl: {
    type: String,
    default: "https://listelist.com/wp-content/uploads/2016/04/zeki-yunus-kelly-620x375.jpg"
},
});

export default mongoose.model("User", userSchema);
