import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { BlogTable } from "../../components/admin/BlogTable";
import { ADMIN_ALLBLOG_API, ADMIN_BLOG_API } from "../../api";

const ManageBlogs = () => {

  const [tab, setTab] = useState("all-blogs");

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(ADMIN_ALLBLOG_API, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw data;
      else setBlogs(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const tabHandler = (eventKey) => setTab(eventKey);

  const verifyBlogHandler = async (id) => {
    try {
      const res = await fetch(ADMIN_BLOG_API + id, { method: "PUT", credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw data;
      else setBlogs((prev) => prev.map((blog) => (blog._id === data._id ? data : blog)));
    } catch (err) {
      throw err;
    }
  };

  const deleteBlog = async (id) => {
    try {
      const res = await fetch(ADMIN_BLOG_API + id, { method: "DELETE", credentials: "include" });
      if (res.ok) setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      else throw await res.json();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Tabs defaultActiveKey="pending" activeKey={tab} onSelect={tabHandler} className="m-3" fill>
      <Tab eventKey="pending" title="Pending Blogs">
        <BlogTable tabs={tab} blogs={blogs} onVerify={verifyBlogHandler} onDelete={deleteBlog} />
      </Tab>
      <Tab eventKey="all-blogs" title="All Blogs">
        <BlogTable tabs={tab} blogs={blogs} onDelete={deleteBlog} />
      </Tab>
    </Tabs>
  );
};

export default ManageBlogs;
