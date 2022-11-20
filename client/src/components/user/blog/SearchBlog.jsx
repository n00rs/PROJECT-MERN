import React, { useState } from "react";
import { Col, Form, ListGroup, Modal, Row } from "react-bootstrap";
import { SEARCH_BLOG_URL } from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SearchBlog = ({ show, toggle }) => {
  // const [searchInput, setSearchInput] = useState("");
  const [searchRes, setsearchRes] = useState([]);
  const navigate = useNavigate();

  const search = async (text) => {
    try {
      const res = await fetch(SEARCH_BLOG_URL + text);
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw data;
      setsearchRes(data);
    } catch (e) {
      console.log(e);
      toast.error(e);
      // console.error(e.message);
    }
  };

  const inputVal = (e) => {
    console.log(e.target.value.trim());
    // setSearchInput(e.target.value);
    search(e.target.value.trim());
  };
  // const searchHandler = ()=> search(searchInput)

  const clickHandler = (id) => {
    navigate(`/blogs/${id}`);
    setsearchRes([]);
    toggle();
  };

  const searchResult = searchRes?.map((blog, index) => (
    <ListGroup as="ol" numbered key={blog._id}>
      <ListGroup.Item
        action
        as="li"
        className="d-flex justify-content-between align-items-start"
        onClick={() => clickHandler(blog._id)}
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{blog.title}</div>
          {blog.content.slice(0, 30)}...........
        </div>
        <div className="text-muted float-end">
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>
      </ListGroup.Item>
    </ListGroup>
  ));
  //   console.log(searchRes);

  return (
    <Modal show={show} scrollable={true} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>SEARCH</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Row>
            <Col md={8}>
              <Form.Control
                type="email"
                // placeholder="type your search here"
                autoFocus
                onChange={inputVal}
                className="searchBlogIcon"
              />
            </Col>
            <Col md={4}>
              {/* <Button variant={"outline-dark"} onClick={searchHandler}>
                <SearchIcon />
                &nbsp; Search
              </Button> */}
            </Col>
          </Row>
        </Form.Group>
        {searchRes.length > 0 ? (
          searchResult
        ) : (
          <p className="p-1">Search blogtitle authorName category</p>
        )}
      </Modal.Body>
    </Modal>
  );
};
