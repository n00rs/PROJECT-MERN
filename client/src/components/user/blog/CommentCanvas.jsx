import React from "react";
import { Offcanvas } from "react-bootstrap";
// import { TrashIcon } from "../../../assets/icons/TrashIcon";
import { CommentsSection } from "./CommentsSection";

export const CommentCanvas = ({ comments, show, onClose, onDelete }) => {
  console.log(comments, "from comments");

  const commentContent = comments?.map((comment) => (
    <CommentsSection
      key={comment._id}
      id={comment._id}
      comment={comment.comment}
      name={comment.name}
      onDelete={onDelete}
    />
  ));

  return (
    <Offcanvas show={show} onHide={onClose} className="text-bg-dark">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Comments</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {comments.length > 0 ? (
          commentContent
        ) : (
          <h6>there is no comment for your post.....!</h6>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
