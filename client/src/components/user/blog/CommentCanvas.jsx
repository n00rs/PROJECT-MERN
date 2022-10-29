import React, { memo } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideComment, removeComment } from "../../../store/userBlogSlice";
// import { TrashIcon } from "../../../assets/icons/TrashIcon";
import { CommentsSection } from "./CommentsSection";

export const CommentCanvas = memo( () => {
  const { showComment, comments } = useSelector((state) => state.userBlog);
  const dispatch = useDispatch();
  const onClose = () => dispatch(hideComment());
  const onDelete = (id) => dispatch(removeComment(id));
  console.log("enter from comments");

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
    <Offcanvas show={showComment} onHide={onClose} className="text-bg-dark">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Comments</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {comments.length > 0 ? (
          commentContent
        ) : (
          <h6>there is no comments for your post.....!</h6>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
});
