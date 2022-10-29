import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { COMMENT_URL } from "../../../Constant";

import { BlogComment } from "./BlogComment";

const initialState = { name: "", comment: "" };

export const EachBlog = ({ blogId }) => {
  
  const [blog, setBlog] = useState({});

  const [commentInput, setCommentInput] = useState(initialState);

  const { blogs, isFetching } = useSelector((state) => state.blog);

  const useEffectFunc = () => {
    const blog = blogs.find((blog) => blog._id === blogId);
    console.log(blog);
    if (blog && blogId) setBlog(blog);
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
      <article>
        <header className="mb-4">
          <h1 className="fw-bolder mb-1">{blog.title}</h1>
          <div className="text-muted fst-italic mb-2">
            {`Posted on ${new Date(blog.createdAt).toDateString()} by ${
              blog.author
            }`}
          </div>

          <Link
            className="badge bg-secondary text-decoration-none link-light"
            href="#!"
          >
            {blog.category}
          </Link>
        </header>

        <figure className="mb-4">
          <img className="img-fluid rounded" src={blog.image} alt="..." />
        </figure>

        <section className="mb-5">
          <p className="fs-5 mb-4">{blog.content}</p>
        </section>
      </article>

      <BlogComment
        commentInpVal={commentInpVal}
        commentHandler={commentHandler}
        comments={blog.comments}
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
