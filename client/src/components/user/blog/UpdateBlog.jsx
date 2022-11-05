// import { memo, useEffect } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideUpdateCanvas } from "../../../store/userBlogSlice";

export const UpdateBlog = ({ titleRef, contentRef, submitHandler }) => {
  const dispatch = useDispatch();
  const { showUpdateCanvas, updateData: values } = useSelector(
    (state) => state.userBlog
  );

  
  const hide =()=> dispatch(hideUpdateCanvas());
  console.log(`entered update component`);

  return (
    <Offcanvas
      placement="end"
      show={showUpdateCanvas}
      onHide={hide}
      className="text-bg-dark  offcanvas-size-xl"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Update Blog</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={submitHandler} className="text-black">
          <Row className="g-2 mb-3">
            <Col md>
              <FloatingLabel label="Blog Title">
                <Form.Control
                  type="text"
                  ref={titleRef}
                  defaultValue={values?.title}
                />
                {/* <Form.Control.Feedback type="invalid">
                  Please provide a title Name.
                </Form.Control.Feedback> */}
              </FloatingLabel>
            </Col>
          </Row>
          <FloatingLabel label="Content">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "300px" }}
              name="content"
              ref={contentRef}
              defaultValue={values?.content}
            />
            {/* <Form.Control.Feedback type="invalid">
              Please provide a title Name.
            </Form.Control.Feedback> */}
          </FloatingLabel>

          <Button
            size="lg"
            className="mt-4"
            variant="outline-secondary"
            type="submit"
            // disabled={!formValid}
          >
            update
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
