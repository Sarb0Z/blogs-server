import mongoose from 'mongoose';
const BlogSchema = mongoose.Schema({
    author: String,
    title: String,
    dateModified: new Date(),
    article: String
});

const Blog =  mongoose.model('Blog', BlogSchema);
export default Blog;
