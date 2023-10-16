import mongoose from "mongoose";

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    author: String,
    title: String,
    body:String,
    tags: [String],
    date: Date,
    comments:[{author:String, body:String}]
  })
);

export default Post;
