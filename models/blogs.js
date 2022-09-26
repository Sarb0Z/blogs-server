import mongoose from "mongoose";
const BlogSchema = mongoose.Schema(
  {
    author: String,
    title: String,
    article: String,
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
