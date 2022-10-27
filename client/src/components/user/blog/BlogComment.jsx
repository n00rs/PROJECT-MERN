import React from "react";
import { Button } from "react-bootstrap";

export const BlogComment = ({
  commentInpVal,
  commentHandler,
  comments,
  commentInput,
}) => {
  if (comments) {
    var commentContent = comments.map((comment) => (
      <div className="d-flex mb-4" key={comment._id}>
        <div className="ms-3">
          <div className="d-flex mt-4">
            <div className="flex-shrink-0">
              <img
                className="rounded-circle"
                src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                alt="..."
              />
            </div>
            <div className="ms-3">
              <div className="fw-bold">{comment.name}</div>
              {comment.comment}
            </div>
          </div>
        </div>
      </div>
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
