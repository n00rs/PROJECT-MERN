import React, { useState } from "react";
import { Card, Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SearchIcon } from "../../../assets/icons/SearchIcon";
import { SearchBlog } from "./SearchBlog";

export const SideBar = () => {
  const [state, setState] = useState(false);
  const toggleSearch = () => setState((prev) => !prev);
  return (
    <>
      <Col lg={4} className="mt-4">
        <div className="sticky-top">
          <Card className="mb-4">
            <Card.Header>Search</Card.Header>
            <Card.Body>
              <div className="input-group">
                <button
                  className="btn btn-primary btn-large"
                  id="button-search"
                  type="button"
                  onClick={toggleSearch}
                >
                  <SearchIcon />
                  Go!
                </button>
              </div>
              <SearchBlog show={state} toggle={toggleSearch} />
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>Categories</Card.Header>
            <Card.Body>
              <Row>
                <Col sm={6}>
                  <ul className="list-unstyled mb-0 ">
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
                  <Link to="/blogs/my-blogs" className="nav-link text-black">
                    My Blogs
                  </Link>
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
    </>
  );
};
