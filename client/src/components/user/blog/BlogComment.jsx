import React from "react";
import { Button } from "react-bootstrap";
import { CommentsSection } from "./CommentsSection";

export const BlogComment = ({
  commentInpVal,
  commentHandler,
  comments,
  commentInput,
}) => {
  if (comments) {
    var commentContent = comments?.map((comment) => (
      <CommentsSection
        key={comment._id}
        name={comment.name}
        comment={comment.comment}
      />
 
    ));
  }
  return (
    <section className="mb-5">
      <div className="card bg-light">
        <div className="card-body">
          <form className="mb-4" onSubmit={commentHandler}>
            <input
              type="text"
              name="name"
              className="form-control mb-3"
              placeholder="enter your name"
              onChange={commentInpVal}
              value={commentInput.name}
            />
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Join the discussion and leave a comment!"
              name="comment"
              onChange={commentInpVal}
              value={commentInput.comment}
            ></textarea>
            <Button type="submit">Post a comment</Button>
          </form>
          {comments && commentContent}
        </div>
      </div>
    </section>
  );
};
