import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { CheckIcon } from "../../assets/icons/CheckIcon";
import { TrashIcon } from "../../assets/icons/TrashIcon";
import { ViewBlogModal } from "./ViewBlogModal";

const style = {
  border: "none",
  borderRadius: "10px",
  width: "100%",
  backgroundColor: "#fff",
};

export const BlogTable = ({ tabs, blogs, onVerify, onDelete }) => {
  console.log(blogs);
  const [viewBlog, setViewBlog] = useState(false);
  const [blog, setBlog] = useState({});

  blogs = tabs === "pending" ? blogs.filter((blog) => blog.verified === false) : blogs;

  const viewBlogHandler = (id) => {
    const blog = blogs.find((ele) => ele._id === id);
    if (blog) {
      setBlog(blog);
      setViewBlog(true);
    } else {
      toast.error("cant find the blog in memo");
    }
  };

  const onHide = () => setViewBlog(false);

  return (
    <div className="container mt-5 p--5">
      <Table responsive striped borderless hover style={style}>
        <thead>
          <tr className="border-bottom">
            <th>#</th>
            <th>
              <span className="ms-2">Author</span>
            </th>
            <th>Title</th>
            <th>Category</th>
            <th>status</th>
            <th>action</th>
            <th>viewMore</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => (
            <tr className="border-bottotom" key={blog._id}>
              <td>1</td>
              <td>
                <div className="p-2">
                  <span className="font-weight-bold">{blog.author}</span>
                </div>
              </td>
              <td>
                <div className="p-2">
                  <span className="font-weight-bold">{blog.title}</span>
                </div>
              </td>
              <td>
                <div className="p-2">
                  <span className="font-weight-bold">{blog.category}</span>
                </div>
              </td>
              <td>
                <div className="p-2">
                  <span className="font-weight-bold">{blog.verified ? "aprooved" : "pending"}</span>
                </div>
              </td>
              <td>
                <div className="p-2">
                  {!blog.verified && (
                    <Button
                      variant="outline-dark"
                      className="me-1"
                      onClick={() => onVerify(blog._id)}
                    >
                      <CheckIcon />
                    </Button>
                  )}

                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      onDelete(blog._id);
                    }}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </td>
              <td>
                <div className="p-2">
                  <Button
                    variant="warning"
                    onClick={() => {
                      viewBlogHandler(blog._id);
                    }}
                  >
                    view more
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ViewBlogModal show={viewBlog} onHide={onHide} blog={blog} />
    </div>
  );
};
