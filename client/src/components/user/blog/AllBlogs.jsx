import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import dummyImg from "../../../assets/dummyBlogImg.jpg";

import { SideBar } from "../blog/SideBar";

export const AllBlogs = () => {
  return (
    <>
      <Container className="p-5">
        <Row>
          {/* <!-- Blog entries--> */}
          <Col lg={8}>
            {/* <!-- Featured blog post--> */}
            <Card className="mb-4">
              <a href="#!">
                <Card.Img
                  class="card-img-top"
                  src="http://localhost:5000/blog_images/abc.png"
                  alt="..."
                />
              </a>
              <Card.Body>
                <div class="small text-muted">January 1, 2022</div>
                <Card.Title>Featured Post Title</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a
                  laboriosam. Dicta expedita corporis animi vero voluptate
                  voluptatibus possimus, veniam magni quis!
                </Card.Text>
                <a class="btn btn-primary" href="#!">
                  Read more →
                </a>
              </Card.Body>
            </Card>
            {/* <!-- Nested row for non-featured blog posts--> */}
            <Row xs={1} md={2} className="g-4 ">
              {Array.from({ length: 10 }).map((_, index) => (
                <Col key={index}>
                  <Card>
                    <Card.Img src={dummyImg} className="rounded" />
                    <Card.Body>
                      <div class="small text-muted">January 1, 2022</div>
                      <Card.Title className=" h4">
                        The title of the blog
                      </Card.Title>
                      <Card.Text>
                        Always strive for better work. Never stop learning. Have
                        fun a clear plan for a new project or just an idea on a
                        napkin? Sky, land, and sea disappear together out of the
                        world..
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Link to={`${index}`}>Click to See more</Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
            {/* <!-- Pagination--> */}
            <div aria-label="Pagination">
              <hr class="my-0" />
              <ul class="pagination justify-content-center my-4">
                <li class="page-item disabled">
                  <a
                    class="page-link"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Newer
                  </a>
                </li>
                <li class="page-item active" aria-current="page">
                  <a class="page-link" href="#!">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#!">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#!">
                    3
                  </a>
                </li>
                <li class="page-item disabled">
                  <a class="page-link" href="#!">
                    ...
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#!">
                    15
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#!">
                    Older
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          <SideBar />
        </Row>
      </Container>
    </>
  );
};

// <Row>
//   <div class="col-lg-6">
//     {/* <!-- Blog post--> */}
//     <div class="card mb-4">
//       <a href="#!">
//         <img
//           class="card-img-top"
//           src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg"
//           alt="..."
//         />
//       </a>
//       <div class="card-body">
//         <div class="small text-muted">January 1, 2022</div>
//         <h2 class="card-title h4">Post Title</h2>
//         <p class="card-text">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//           Reiciendis aliquid atque, nulla.
//         </p>
//         <a class="btn btn-primary" href="#!">
//           Read more →
//         </a>
//       </div>
//     </div>
//     {/* <!-- Blog post--> */}
//     <div class="card mb-4">
//       <a href="#!">
//         <img
//           class="card-img-top"
//           src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg"
//           alt="..."
//         />
//       </a>
//       <div class="card-body">
//         <div class="small text-muted">January 1, 2022</div>
//         <h2 class="card-title h4">Post Title</h2>
//         <p class="card-text">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//           Reiciendis aliquid atque, nulla.
//         </p>
//         <a class="btn btn-primary" href="#!">
//           Read more →
//         </a>
//       </div>
//     </div>
//   </div>
//   <div class="col-lg-6">
//     {/* <!-- Blog post--> */}
//     <div class="card mb-4">
//       <a href="#!">
//         <img
//           class="card-img-top"
//           src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg"
//           alt="..."
//         />
//       </a>
//       <div class="card-body">
//         <div class="small text-muted">January 1, 2022</div>
//         <h2 class="card-title h4">Post Title</h2>
//         <p class="card-text">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//           Reiciendis aliquid atque, nulla.
//         </p>
//         <a class="btn btn-primary" href="#!">
//           Read more →
//         </a>
//       </div>
//     </div>
//     {/* <!-- Blog post--> */}
//     <div class="card mb-4">
//       <a href="#!">
//         <img
//           class="card-img-top"
//           src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg"
//           alt="..."
//         />
//       </a>
//       <div class="card-body">
//         <div class="small text-muted">January 1, 2022</div>
//         <h2 class="card-title h4">Post Title</h2>
//         <p class="card-text">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//           Reiciendis aliquid atque, nulla? Quos cum ex quis soluta,
//           a laboriosam.
//         </p>
//         <a class="btn btn-primary" href="#!">
//           Read more →
//         </a>
//       </div>
//     </div>
//   </div>
// </Row>
// <Container className="mt-4 " >
//   {/* <Row>
//   <Col md={4}>md=4</Col>
// </Row> */}
//   {/* <Col md={4}>md=4</Col> */}
//   <Row xs={1} md={2} className="g-4 ">
//     {Array.from({ length: 10 }).map(( _ ,index) => (
//       <Col key={index}>
//         <Card bg={'black'} text='white'>
//           <Card.Img src={dummyImg} className="rounded" />
//           <Card.Title className="display-5 p-5">
//             The title of the blog
//           </Card.Title>
//           <Card.Header>
//             <Row>
//               <Col>
//                 BY : <strong>USERNAME</strong>{" "}
//               </Col>
//               <Col>
//                < small>Last Updated At:</small> <strong>12/12/2222</strong>{" "}
//               </Col>
//             </Row>
//           </Card.Header>
//           <Card.Body>
//             <Card.Text>
//               Always strive for better work. Never stop learning. Have fun
//               a clear plan for a new project or just an idea on a napkin?
//               Sky, land, and sea disappear together out of the world..
//             </Card.Text>
//           </Card.Body>
//           <Card.Footer>
//               <Link to={`${index}`} >Click to See more</Link>
//           </Card.Footer>
//         </Card>
//       </Col>
//     ))}
//   </Row>
// </Container>
