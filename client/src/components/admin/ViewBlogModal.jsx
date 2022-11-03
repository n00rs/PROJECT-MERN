import React from "react";
import { Modal } from "react-bootstrap";
import { BlogArticle } from "../UI/BlogArticle";
import { CommentsSection } from "../user/blog/CommentsSection";

export const ViewBlogModal = ({ blog, show, onHide }) => {

  const commentContent = blog?.comments?.map((comment) => (
    <CommentsSection name={comment.name} comment={comment.comment} />
  ));

  return (
    <Modal show={show} onHide={onHide} scrollable size="lg">
      <Modal.Header closeButton>
        <Modal.Title>blog</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <BlogArticle blog={blog} />
        <h6>Comments</h6>
        {blog?.comments?.length > 0 && commentContent}
      </Modal.Body>
    </Modal>
  );
};
