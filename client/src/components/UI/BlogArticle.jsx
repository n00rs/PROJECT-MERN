import React from "react";
import { Link } from "react-router-dom";

export const BlogArticle = ({ blog }) => {
  return (
    <article>
      <header className="mb-4">
        <h1 className="fw-bolder mb-1">{blog.title}</h1>
        <div className="text-muted fst-italic mb-2">
          {`Posted on ${new Date(blog.createdAt).toDateString()} by ${blog.author}`}
        </div>

        <Link className="badge bg-secondary text-decoration-none link-light" to="">
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
  );
};
