import React from "react";
import { Banner } from "../components/UI/Banner";
import blogBanner from "../assets/blogBanner.jpg";
import { AllBlogs } from "../components/user/blog/AllBlogs";
import { useParams } from "react-router-dom";
const Blog = () => {
  // const params =   useParams ()
  // console.log(params);
  return (
    <>
      <Banner title="BLOG" img={blogBanner} />
      <AllBlogs />
    </>
  );
};

export default Blog;
