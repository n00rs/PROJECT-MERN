import React, { memo } from "react";
import { Button } from "react-bootstrap";

export const CommentsSection = memo(({ name, comment, id, btn, onDelete }) => {
  console.log(name, comment, "comment");
  return (
    <div className="d-flex mb-4">
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
            <div className="fw-bold">{name}</div>
            {comment}
          </div>
          <div className="float-end ms-auto">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete(id)}
            >
              X
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
