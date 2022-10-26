import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { BlogComment } from "./BlogComment";

export const EachBlog = ({ blogId }) => {
  const [blog, setBlog] = useState({});

  console.log(blogId, "from /:id");

  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    const blog = blogs.find((blog) => blog._id === blogId);
    console.log(blog);
    if (blog && blogId) setBlog(blog);
    // else throw new Error ('opps lost your way go home')
  }, [blogs,blogId]);
  



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

          <a
            className="badge bg-secondary text-decoration-none link-light"
            href="#!"
          >
            {blog.category}
          </a>
        </header>

        <figure className="mb-4">
          <img className="img-fluid rounded" src={blog.image} alt="..." />
        </figure>

        <section className="mb-5">
          <p className="fs-5 mb-4">{blog.content}</p>
        </section>
      </article>

      <BlogComment />
    </>
  );
};
