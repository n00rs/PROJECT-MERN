import React, { useRef, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { ADD_PRODUCT_API } from "../../Constant";
import { Spinner } from "../UI/Spinner";
import { s3UploadHandler } from "./awsService";

export const AddProductForm = () => {
  const [inputVal, setInputVal] = useState({});
  const [sizeVal, setSizeVal] = useState({});
  const [isLoading, setIsloading] = useState();
  const fileRef = useRef();

  const changeHandler = (e) =>
    setInputVal((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  const sizeHandler = (e) =>
    setSizeVal((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      const imageFiles = fileRef.current?.files;
      const imageLinks = [];
      console.log(imageFiles.isArray);

      for (let i = 0; i < imageFiles.length; i++) {
        console.log(imageFiles[i]);
        const imageLink = await s3UploadHandler(imageFiles[i]);
        imageLinks.push(imageLink);
      }

      const body = JSON.stringify({ ...inputVal, size: { ...sizeVal }, images: imageLinks });
      console.log(body);
      const res = await fetch(ADD_PRODUCT_API, {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        credentials:'include'
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw data;

      setIsloading(false);
    } catch (err) {
      setIsloading(false);
      console.log(err, "err.in add product");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <Form onSubmit={submitHandler}>
      <Row className="g-2 mb-3">
        <Col md>
          <Form.Label className="m-1">CATEGORY</Form.Label>
          <div>
            <Form.Check
              label="men"
              value="men"
              name="category"
              type="radio"
              inline
              onChange={changeHandler}
            />
            <Form.Check
              label="women"
              type="radio"
              name="category"
              value="women"
              inline
              onChange={changeHandler}
            />
            <Form.Check
              label="unisex"
              type="radio"
              name="category"
              value="unisex"
              inline
              onChange={changeHandler}
            />
          </div>
        </Col>
        <Col md>
          <FloatingLabel label="SUBCATEGORY">
            <Form.Control
              type="text"
              name="subcategory"
              placeholder="t-shirt,shirt,pants,boots"
              onChange={changeHandler}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="g-2 mb-3">
        <Col md>
          <FloatingLabel label="BRAND NAME">
            <Form.Control type="text" name="brand" placeholder="brand" onChange={changeHandler} />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel label="PRODUCT NAME">
            <Form.Control
              type="text"
              name="productName"
              placeholder="product name"
              onChange={changeHandler}
            />
          </FloatingLabel>
        </Col>
      </Row>
      QUANTITY
      <Row className="g-2 mb-3">
        <Col md={2}>
          <FloatingLabel label="small">
            <Form.Control type="number" name="small" placeholder="size" onChange={sizeHandler} />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel label="medium">
            <Form.Control type="number" name="medium" placeholder="size" onChange={sizeHandler} />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel label="large">
            <Form.Control type="number" name="large" placeholder="size" onChange={sizeHandler} />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel label="EXTRA LARGE">
            <Form.Control type="number" name="xl" placeholder="size" onChange={sizeHandler} />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel label="XXL">
            <Form.Control type="number" name="xxl" placeholder="size" onChange={sizeHandler} />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel label="FREE-SIZE">
            <Form.Control
              type="number"
              name="free-size"
              placeholder="size"
              onChange={sizeHandler}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mt-3 ">
        <Col md={3}>
          <FloatingLabel label="PRICE">
            <Form.Control type="number" name="price" placeholder="price" onChange={changeHandler} />
          </FloatingLabel>
        </Col>
        <Col md={9}>
          <Form.Control type="file" name="productImage" className="mt-3" ref={fileRef} multiple />
        </Col>
        <FloatingLabel label="DESCRIPTION">
          <Form.Control
            as="textarea"
            placeholder="decribe"
            name="description"
            style={{ height: "100px" }}
            onChange={changeHandler}
          />
        </FloatingLabel>
      </Row>
      <Button type="submit" className="text-center m-5">
        SUBMIT
      </Button>
    </Form>
  );
};