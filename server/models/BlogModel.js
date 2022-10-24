const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    verified: { type: Boolean, default: false },
    comments: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog',blogSchema)
