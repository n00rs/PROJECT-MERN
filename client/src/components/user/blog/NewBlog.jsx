

import { Col, Container, Row, } from "react-bootstrap";
import { toast } from "react-toastify";
import { BlogForm } from "./BlogForm";
import { SideBar } from "./SideBar";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../UI/Spinner";

export const NewBlog = () => {
  const navigate = useNavigate();
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.blog
  );

  if (isError) toast.error(message);
  if (isLoading) return <Spinner />;
  if (isSuccess) navigate("/blogs");

  return (
    <Container>
      <Row>
        <Col lg={8} className="bg-light">
          <Container className="p-5">
            <p className="display-5 text-black">Write an Blog ...!</p>
          </Container>
          <BlogForm />
        </Col>
        <SideBar />
      </Row>
    </Container>
  );
};
