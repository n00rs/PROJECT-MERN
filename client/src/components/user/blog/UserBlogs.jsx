import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { CommentIcon } from "../../../assets/icons/CommentIcon";
import { EditIcon } from "../../../assets/icons/EditIcon";
import { TrashIcon } from "../../../assets/icons/TrashIcon";
import userBlogBanner from "../../../assets/userBlogBanner.jpg";
import { USER_BLOGS_URL } from "../../../Constant";
import { BlogContainer } from "../../UI/BlogContainer";
import { BlogCard } from "./BlogCard";
export const UserBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);

  const fetchUserBlogs = async () => {
    try {
      const response = await fetch(USER_BLOGS_URL, { credentials: "include" });
      const data = await response.json();
      if (!response.ok) throw data;
      setUserBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const deleteHandler = async (id) => {
    console.log(id);
    try {
      const response = await fetch(USER_BLOGS_URL + "/" + id, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw data;
      else {
        setUserBlogs((prev) => prev.filter((blog) => blog._id !== id));
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // const userBlogContent = userBlogs.map((blog) => (
  //   <BlogCard
  //     key={blog._id}
  //     id={blog._id}
  //     date={new Date(blog.createdAt).toDateString()}
  //     image={blog.image}
  //     content={blog.content.slice(0, 150)}
  //     title={blog.title}
  //     onDelete={deleteHandler}
  //   />
  // ));

  return (
    <BlogContainer img={userBlogBanner}>
      {/* {userBlogs && userBlogContent} */}
      {userBlogs.map((blog) => (
        <Card className=" mt-4" key={blog._id}>
          <Card.Header>
            <p className="fs-5">{blog.title}</p>

            <button
              className="btn btn-outline-danger float-end"
              onClick={() => deleteHandler(blog._id)}
            >
              <TrashIcon />
            </button>
            <button className="btn btn-outline-dark me-2 float-end">
              <EditIcon />
            </button>
            <button className="btn btn-outline-dark me-2 float-end">
              <CommentIcon />
            </button>
          </Card.Header>
          <Card.Body className="bg-light border-none">
            <img src={blog.image} style={{ height: "80px", width: "100px" }} />
            {blog.content.slice(0, 50)}....
          </Card.Body>
          <Card.Footer className="text-muted">
            Date : {new Date(blog.createdAt).toDateString()} ago
          </Card.Footer>
        </Card>
      ))}
    </BlogContainer>
  );
};
