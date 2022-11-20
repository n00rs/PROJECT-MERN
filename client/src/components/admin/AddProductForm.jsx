import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { s3UploadHandler } from "../../store/admin/awsService";
import { Spinner } from "../UI/Spinner";
import { ADD_PRODUCT_API, UPDATE_STOCK_API } from "../../api";

export const AddProductForm = ({ updateProdValues }) => {
  const initialSizeState = {
    small: updateProdValues?.size?.small,
    medium: updateProdValues?.size?.medium,
    large: updateProdValues?.size?.large,
    extraLarge: updateProdValues?.size?.extraLarge,
    xxl: updateProdValues?.size?.xxl,
    freeSize: updateProdValues?.size?.freeSize,
  };

  const [inputVal, setInputVal] = useState({});
  const [sizeVal, setSizeVal] = useState(initialSizeState);
  const [isLoading, setIsLoading] = useState();
  const fileRef = useRef();
  const navigate = useNavigate();

  const changeHandler = (e) =>
    setInputVal((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  const sizeHandler = (e) =>
    setSizeVal((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imageFiles = fileRef.current?.files;
      const imageLinks = [];

      //addming images to aws S3 bucket
      for (let i = 0; i < imageFiles?.length; i++) {
        console.log(imageFiles[i]);
        const imageLink = await s3UploadHandler(imageFiles[i]);
        imageLinks.push(imageLink);
      }

      const images = imageLinks.length > 0 ? imageLinks : [];
      let body;
      if (imageLinks.length > 0)
        body = JSON.stringify({ ...inputVal, size: { ...sizeVal }, images: imageLinks });
      else body = JSON.stringify({ ...inputVal, size: { ...sizeVal } });

      const url = updateProdValues ? UPDATE_STOCK_API + updateProdValues._id : ADD_PRODUCT_API;

      const res = await fetch(url, {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) throw data;
      else navigate("/admin/dash");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
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
              defaultChecked={updateProdValues?.category === "men"}
              inline
              onChange={changeHandler}
            />
            <Form.Check
              label="women"
              type="radio"
              name="category"
              value="women"
              defaultChecked={updateProdValues?.category === "wommen"}
              inline
              onChange={changeHandler}
            />
            <Form.Check
              label="unisex"
              type="radio"
              name="category"
              defaultChecked={updateProdValues?.category === "unisex"}
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
              defaultValue={updateProdValues?.subcategory}
              onChange={changeHandler}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="g-2 mb-3">
        <Col md>
          <FloatingLabel label="BRAND NAME">
            <Form.Control
              type="text"
              name="brand"
              placeholder="brand"
              onChange={changeHandler}
              defaultValue={updateProdValues?.brand}
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel label="PRODUCT NAME">
            <Form.Control
              type="text"
              name="productName"
              defaultValue={updateProdValues?.productName}
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
            <Form.Control
              type="number"
              name="small"
              placeholder="size"
              onChange={sizeHandler}
              defaultValue={updateProdValues?.size?.small}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel label="medium">
            <Form.Control
              type="number"
              name="medium"
              placeholder="size"
              onChange={sizeHandler}
              defaultValue={updateProdValues?.size?.medium}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel label="large">
            <Form.Control
              type="number"
              name="large"
              placeholder="size"
              onChange={sizeHandler}
              defaultValue={updateProdValues?.size?.large}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel label="EXTRA LARGE">
            <Form.Control
              type="number"
              name="xl"
              placeholder="size"
              onChange={sizeHandler}
              defaultValue={updateProdValues?.size?.extraLarge}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel label="XXL">
            <Form.Control
              type="number"
              name="xxl"
              placeholder="size"
              onChange={sizeHandler}
              defaultValue={updateProdValues?.size?.xxl}
            />
          </FloatingLabel>
        </Col>
        <Col md={2}>
          <FloatingLabel label="FREE-SIZE">
            <Form.Control
              type="number"
              name="freeSize"
              placeholder="size"
              defaultValue={updateProdValues?.size?.freeSize}
              onChange={sizeHandler}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mt-3 ">
        <Col md={3}>
          <FloatingLabel label="PRICE">
            <Form.Control
              type="number"
              name="price"
              placeholder="price"
              defaultValue={updateProdValues?.price}
              onChange={changeHandler}
            />
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
            defaultValue={updateProdValues?.description}
            onChange={changeHandler}
          />
        </FloatingLabel>
      </Row>
      <Button type="submit" className="text-center m-5 bg-warning">
        SUBMIT
      </Button>
    </Form>
  );
};
