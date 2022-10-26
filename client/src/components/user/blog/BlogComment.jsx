import React from "react";
import { Button } from "react-bootstrap";

export const BlogComment = () => {
  return (
    <section className="mb-5">
      <div className="card bg-light">
        <div className="card-body">
          <form className="mb-4">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Join the discussion and leave a comment!"
            ></textarea>
            <Button variant="outline-secondary ms-auto mt-1">Comment</Button>
          </form>

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
                  <div className="fw-bold">Commenter Name</div>
                  And under those conditions, you cannot establish a
                  capital-market evaluation of that enterprise. You can't get
                  investors.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
