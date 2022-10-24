import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { NEW_BLOG_URL } from "../../../Constant";
import { SideBar } from "./SideBar";

export const NewBlog = () => {
 
 
  const initialState = {
    author: "",
    category: "",
    title: "",
    content: "",
  };

  const [inputValues, setInputValues] = useState(initialState);
  const [image, setImage] = useState();
  // const formData = new FormData();
  //   formData.append('image', image);
  //   formData.append({...inputValues})
  const getInputValues = (e) => {
    // formData.append([e.target.name], e.target.value) ;
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getFile = (e) => setImage(e.target.files[0]);
  const submitHandler = async (e) => {
    e.preventDefault();
    // alert(inputValues); 
    // console.log(inputValues);
    const formData = new FormData();
    formData.append("blogImage", image);
    for (let value in inputValues) {
      formData.append(value, inputValues[value]);
    }

    console.log(formData);

    const body = { ...inputValues, ...formData };
    console.log(body);
    // console.log(body);

    try {
      const response = await fetch(NEW_BLOG_URL, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.error(e.message, "err in new blog");
    }
  };



  return (
    <Container>
      <Row>
        <Col lg={8} className="bg-light">
          <Container className="p-5">
            <p className="display-5 text-black">Write an Blog ...!</p>
          </Container>
          <Form onSubmit={submitHandler}>
            <Row className="g-2 mb-3">
              <Col md>
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="AUTHOR NAME"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="author"
                    onChange={getInputValues}
                  />
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
                    onChange={getInputValues}
                  >
                    <option value="others">Others</option>
                    <option value="dirt-racing">Dirt-racing</option>
                    <option value="track-racing">Track-Racing</option>
                    <option value="Bike-culture">Bike-Culture</option>
                    <option value="travel">Travel</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="g-2 mb-3">
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Blog Title">
                  <Form.Control
                    type="text"
                    placeholder="Blog Title"
                    name="title"
                    onChange={getInputValues}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <FloatingLabel controlId="floatingTextarea2" label="Content">
              <Form.Control
                type="text"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                name="content"
                onChange={getInputValues}
              />
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
            >
              Post New Blog
            </Button>
          </Form>
        </Col>
        <SideBar />
      </Row>
    </Container>
  );
};
