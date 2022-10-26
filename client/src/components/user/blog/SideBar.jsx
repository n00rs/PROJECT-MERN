import React from "react";
import { Button, Card, Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <Col lg={4} className='mt-4'>
      <div className="sticky-top">
        <Card className="mb-4">
          <Card.Header>Search</Card.Header>
          <Card.Body>
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter search term..."
                aria-label="Enter search term..."
                aria-describedby="button-search"
              />
              <button
                className="btn btn-primary"
                id="button-search"
                type="button"
              >
                Go!
              </button>
            </div>
          </Card.Body>
        </Card>
        <Card className="mb-4">
          <Card.Header>Categories</Card.Header>
          <Card.Body>
            <Row>
              <Col sm={6}>
                <ul className="list-unstyled mb-0 " >
                  <li>
                    <a href="#!">Web Design</a>
                  </li>
                  <li>
                    <a href="#!">HTML</a>
                  </li>
                  <li>
                    <a href="#!">Freebies</a>
                  </li>
                </ul>
              </Col>
              <Col sm={6}>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!">Web Design</a>
                  </li>
                  <li>
                    <a href="#!">HTML</a>
                  </li>
                  <li>
                    <a href="#!">Freebies</a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mb-4 ">
          <Card.Body>
            <Nav className="flex-column" fill variant="tabs">
              <Nav.Item>
                <Link to='/blogs/my-blogs' className="nav-link text-black">My Blogs</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/blogs/new-blog" className="nav-link text-black">
                  Write a Blog
                </Link>
              </Nav.Item>
            </Nav>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};
