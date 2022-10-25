import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import useValid from "../../../hooks/useValid";
import { postBlog } from "../../../store/blogSlice";

const isNotEmpty = (val) => val.trim() !== "";

export const BlogForm = () => {

  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const getFile = (e) => setImage(e.target.files[0]);

  const {
    blurHandler: titleBlur,
    value: title,
    isError: titleError,
    isValid: titleIsValid,
    reset: resetTitle,
    valueChangeHandler: titleChangeHandler,
  } = useValid(isNotEmpty);

  const {
    value: author,
    blurHandler: authorBlur,
    isError: authorError,
    isValid: authorIsValid,
    reset: resetAuthor,
    valueChangeHandler: authorChangeHandler,
  } = useValid(isNotEmpty);

  const {
    value: category,
    blurHandler: categoryBlur,
    isError: categoryError,
    isValid: categoryIsValid,
    reset: resetCategory,
    valueChangeHandler: categoryChangeHandler,
  } = useValid(isNotEmpty);

  const {
    blurHandler: contentBlur,
    value: content,
    isError: contentError,
    isValid: contentIsValid,
    reset: resetContent,
    valueChangeHandler: contentChangeHandler,
  } = useValid(isNotEmpty);

  let formValid = false;
  if (authorIsValid && titleIsValid && contentIsValid && categoryIsValid)
    formValid = true;

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(author, content, title, category);
    const formData = new FormData();
    formData.append("blogImage", image);
    formData.append("author", author);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);

    dispatch(postBlog(formData));
  };
  return (
    <Form onSubmit={submitHandler}>
      <Row className="g-2 mb-3">
        <Col md>
          <FloatingLabel label="AUTHOR">
            <Form.Control
              type="text"
              name="author"
              placeholder="author"
              onChange={authorChangeHandler}
              value={author}
              onBlur={authorBlur}
              isInvalid={authorError}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Name.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Choose a category"
          >
            <Form.Select
              aria-label="Floating label select example"
              name="category"
              onChange={categoryChangeHandler}
              onBlur={categoryBlur}
              value={category}
              isInvalid={categoryError}
            >
              <option>Choose</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="culture">Culture</option>
              <option value="racing">Racing</option>
              <option value="others">Others</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              please select an category
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="g-2 mb-3">
        <Col md>
          <FloatingLabel label="Blog Title">
            <Form.Control
              type="text"
              onChange={titleChangeHandler}
              value={title}
              onBlur={titleBlur}
              isInvalid={titleError}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a title Name.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>

      <FloatingLabel label="Content">
        <Form.Control
          type="text"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          name="content"
          onChange={contentChangeHandler}
          value={content}
          onBlur={contentBlur}
          isInvalid={contentError}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a title Name.
        </Form.Control.Feedback>
      </FloatingLabel>
     
      <Form.Control
        type="file"
        name="blogImage"
        className="mt-3"
        onChange={getFile}
      />

      <Button
        size="lg"
        className="mt-4"
        variant="outline-secondary"
        type="submit"
       disabled={!formValid}
      >
        Post New Blog
      </Button>
    </Form>
  );
};


