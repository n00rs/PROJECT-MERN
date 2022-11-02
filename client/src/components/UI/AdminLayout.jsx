import React from "react";
import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { SideBar } from "../user/blog/SideBar";
import { SideBar } from "../admin/SideBar";

export const AdminLayout = ({ children }) => {
  
  return (
    <>
      <Row>
        <SideBar />
        <Col md={10}>
          {children}
          <Outlet />
        </Col>
      </Row>
      <ToastContainer />

    </>
  );
};
