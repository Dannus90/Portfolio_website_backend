const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    blogPost: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
    },
    date: {
        type: "String",
        required: true,
    },
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
