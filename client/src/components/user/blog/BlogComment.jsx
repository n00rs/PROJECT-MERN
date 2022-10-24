import React from "react";
import { Button } from "react-bootstrap";

export const BlogComment = () => {
  return (
    <section class="mb-5">
      <div class="card bg-light">
        <div class="card-body">
          <form class="mb-4">
            <textarea
              class="form-control"
              rows="3"
              placeholder="Join the discussion and leave a comment!"
            ></textarea>
            <Button variant="outline-secondary ms-auto mt-1">Comment</Button>
          </form>

          <div class="d-flex mb-4">
            <div class="ms-3">
              <div class="d-flex mt-4">
                <div class="flex-shrink-0">
                  <img
                    class="rounded-circle"
                    src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                    alt="..."
                  />
                </div>
                <div class="ms-3">
                  <div class="fw-bold">Commenter Name</div>
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
