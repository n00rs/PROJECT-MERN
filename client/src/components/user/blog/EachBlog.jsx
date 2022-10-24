import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import dummyImg from "../../../assets/dummyBlogImg.jpg";
import { BlogComment } from "./BlogComment";
import { SideBar } from "./SideBar";
export const EachBlog = () => {
  const { blogId } = useParams();
  console.log(blogId, "from /:id");
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col lg={8}>
            {/* <!-- Post content--> */}
            <article>
              {/* <!-- Post header--> */}
              <header class="mb-4">
                {/* <!-- Post title--> */}
                <h1 class="fw-bolder mb-1">Welcome to Blog Post!</h1>
                {/* <!-- Post meta content--> */}
                <div class="text-muted fst-italic mb-2">
                  Posted on January 1, 2022 by Start Bootstrap
                </div>
                {/* <!-- Post categories--> */}
                <a
                  class="badge bg-secondary text-decoration-none link-light"
                  href="#!"
                >
                  Web Design
                </a>
                <a
                  class="badge bg-secondary text-decoration-none link-light"
                  href="#!"
                >
                  Freebies
                </a>
              </header>

              <figure class="mb-4">
                <img class="img-fluid rounded" src={dummyImg} alt="..." />
              </figure>

              {/* <!-- Post content--> */}
              <section class="mb-5">
                <p class="fs-5 mb-4">
                  Science is an enterprise that should be cherished as an
                  activity of the free human mind. Because it transforms who we
                  are, how we live, and it gives us an understanding of our
                  place in the universe. The universe is large and old, and the
                  ingredients for life as we know it are everywhere, so there's
                  no reason to think that Earth would be unique in that regard.
                  Whether of not the life became intelligent is a different
                  question, and we'll see if we find that.
                </p>
              </section>
            </article>

            <BlogComment />
          </Col>

          {/* <!-- Side widgets--> */}
          <SideBar />

        </Row>
      </Container>
    </>
  );
};
