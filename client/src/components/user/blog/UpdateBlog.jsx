import {
  Button,
  Col,
  FloatingLabel,
  Form,
  Offcanvas,
  Row,
} from "react-bootstrap";

export const UpdateBlog = ({
  show,
  hide,
  values,
  titleRef,
  contentRef,
  submitHandler,
}) => {
  return (
    <Offcanvas
      placement="end"
      show={show}
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
