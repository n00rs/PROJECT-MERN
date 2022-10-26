import { useEffect } from "react";
import blogBanner from "../assets/blogBanner.jpg";
import { AllBlogs } from "../components/user/blog/AllBlogs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "../store/blogSlice";
import { EachBlog } from "../components/user/blog/EachBlog";
import { BlogContainer } from "../components/UI/BlogContainer";

const Blog = () => {
 
 
  const dispatch = useDispatch();
  const { pageNo } = useSelector((state) => state.blog);
  const { blogId } = useParams();
 
  console.log(blogId);

  useEffect(() => {
    dispatch(fetchAllBlogs(pageNo));
  }, [pageNo, dispatch]);

  return (
    <BlogContainer img={blogBanner}>
      {blogId ? <EachBlog blogId={blogId} /> : <AllBlogs />}
    </BlogContainer>
  );
};

export default Blog;
