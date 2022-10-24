import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="col-lg-4 ">
      <div className="sticky-top">
        <div className="card mb-4">
          <div className="card-header">Search</div>
          <div className="card-body">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter search term..."
                aria-label="Enter search term..."
                aria-describedby="button-search"
              />
              <button className="btn btn-primary" id="button-search" type="button">
                Go!
              </button>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header">Categories</div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6">
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
              </div>
              <div className="col-sm-6">
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!">JavaScript</a>
                  </li>
                  <li>
                    <a href="#!">CSS</a>
                  </li>
                  <li>
                    <a href="#!">Tutorials</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-4">

          <div className="card-body">
            <Nav className="flex-column" fill variant="tabs" >
              <Nav.Item>
                <Nav.Link href="/home">My Blogs</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Write a Blog</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </div>
    </div>
  );
};
