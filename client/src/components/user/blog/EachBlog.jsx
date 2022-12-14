import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { COMMENT_URL, EACH_BLOG_URL } from "../../../api";
import { BlogArticle } from "../../UI/BlogArticle";


import { BlogComment } from "./BlogComment";

const initialState = { name: "", comment: "" };

export const EachBlog = ({ blogId }) => {
  const [blog, setBlog] = useState({});
  const [commentInput, setCommentInput] = useState(initialState);
  const { blogs, isFetching } = useSelector((state) => state.blog);

  const fetchBlog = async () => {
    try {
      const res = await fetch(EACH_BLOG_URL + blogId);
      const data = await res.json();
      if (!res.ok) throw data;
      setBlog(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const useEffectFunc = () => {
    const blog = blogs.find((blog) => blog._id === blogId);
    console.log(blog);
    if (blog && blogId) setBlog(blog);
    else fetchBlog();
    // else throw new Error ('opps lost your way go home')
  };

  useEffect(useEffectFunc, [blogs, blogId]);

  const commentInpVal = (e) =>
    setCommentInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const commentHandler = async (event) => {
    event.preventDefault();

    try {
      const body = { ...commentInput, blogId };

      const response = await fetch(COMMENT_URL, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) throw data;

      setBlog((prev) => ({ ...prev, comments: data.comments }));
      setCommentInput(initialState);
      // console.log(data);
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };

  if (isFetching) return <h1>Loading....</h1>;

  return (
    <>
      <BlogArticle blog={blog} />

      <BlogComment
        commentInpVal={commentInpVal}
        commentHandler={commentHandler}
        comments={blog?.comments}
        commentInput={commentInput}
      />
    </>
  );
};

// export const actions = async ({ request }) => {
//   try {
//     const formData = await request.formData();
//     const comment = formData.get("comment");
//     console.log(comment);
//   } catch (e) {
//     console.log(e, "err in new post method");
//     throw e.message;
//   }
// };
