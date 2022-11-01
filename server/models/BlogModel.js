const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
});

const blogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    verified: { type: Boolean, default: false },
    comments: [commentSchema],
  },
  { timestamps: true }
);
blogSchema.index({ createdAt: 1 });
blogSchema.index({ title: "text",author:'text',category:'text' });

module.exports = mongoose.model("Blog", blogSchema);
    