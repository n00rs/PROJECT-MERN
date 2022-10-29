import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { BlogForm } from "./BlogForm";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../UI/Spinner";
import { reset } from "../../../store/blogSlice";
import { BlogContainer } from "../../UI/BlogContainer";
import newBlogBanner from '../../../assets/newBlogBanner.png'

export const NewBlog = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSubmitting, isSubmitted, message } = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    if (isSubmitted) {
      navigate("/blogs");
      dispatch(reset());
      // dispatch;
    }
  }, [isSubmitted]);

  if (isError) toast.error(message);
  if (isSubmitting) return <Spinner />;

  return (
    <BlogContainer img={newBlogBanner}>
      <Container className="p-5">
        <p className="display-5 text-black">Write an Blog ...!</p>
      </Container>
      <BlogForm />
    </BlogContainer>
  );
};
