import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { CommentIcon } from "../../../assets/icons/CommentIcon";
import { EditIcon } from "../../../assets/icons/EditIcon";
import { TrashIcon } from "../../../assets/icons/TrashIcon";
import userBlogBanner from "../../../assets/userBlogBanner.jpg";
import {
  COMMENT_URL,
  UPDATE_BLOG_URL,
  USER_BLOGS_URL,
} from "../../../Constant";
import { BlogContainer } from "../../UI/BlogContainer";
// import { BlogCard } from "./BlogCard";
import { CommentCanvas } from "./CommentCanvas";
import { UpdateBlog } from "./UpdateBlog";

export const UserBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({
    title: "",
    content: "",
    blogId: "",
  });
  const titleRef = useRef();
  const contentRef = useRef();

  const fetchUserBlogs = async () => {
    try {
      const response = await fetch(USER_BLOGS_URL, { credentials: "include" });
      const data = await response.json();
      if (!response.ok) throw data;
      setUserBlogs(data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
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

  const commentsHandler = (id) => {
    setShowComment((prev) => !prev);
    const blog = userBlogs.find((ele) => ele._id === id);
    console.log(blog);
    setComment(blog.comments);
  };

  const onClose = () => setShowComment(false);
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

  const deleteComment = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`${COMMENT_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setComment(data.comments);
    } catch (e) {
      console.error(e.message);
    }
  };

  const editHandler = (blogId) => {
    console.log(blogId);
    const { title, content } = userBlogs.find((blog) => blog._id === blogId);
    setUpdateData({ title, content, blogId });
    setShowUpdate(true);
  };

  const hideUpdate = () => setShowUpdate(false);

  const updateHamdler = async (e) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    console.log(title, content, updateData.blogId);

    try {
      const body = JSON.stringify({
        title,
        content,
        blogId: updateData.blogId,
      });

      const response = await fetch(UPDATE_BLOG_URL, {
        method: "PUT",
        body: body,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw data;

      setUserBlogs((prev) =>
        prev.map((blog) => (blog._id === data._id ? data : blog))
      );
      console.log(data);
      hideUpdate();
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <BlogContainer img={userBlogBanner}>
        {userBlogs.map((blog) => (
          <Card className=" mt-4" key={blog._id}>
            <Card.Header>
              <p className="fs-5">{blog?.title}</p>

              <button
                className="btn btn-outline-danger float-end"
                onClick={() => deleteHandler(blog._id)}
              >
                <TrashIcon />
              </button>
              <button
                className="btn btn-outline-dark me-2 float-end"
                onClick={() => editHandler(blog._id)}
              >
                <EditIcon />
              </button>
              <button
                className="btn btn-outline-dark me-2 float-end"
                onClick={() => commentsHandler(blog._id)}
              >
                <CommentIcon />
              </button>
            </Card.Header>
            <Card.Body className="bg-light border-none">
              <img
                src={blog.image}
                style={{ height: "80px", width: "100px" }}
              />
              {blog?.content?.slice(0, 50)}....
            </Card.Body>
            <Card.Footer className="text-muted">
              Date : {new Date(blog?.createdAt).toDateString()} ago
            </Card.Footer>
          </Card>
        ))}
      </BlogContainer>
      <CommentCanvas
        show={showComment}
        comments={comment}
        onClose={onClose}
        onDelete={deleteComment}
      />
      <UpdateBlog
        hide={hideUpdate}
        show={showUpdate}
        values={updateData}
        titleRef={titleRef}
        contentRef={contentRef}
        submitHandler={updateHamdler}
      />
    </>
  );
};
