import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
// import { SideBar } from "../user/blog/SideBar";
import { SideBar } from "../admin/SideBar";

export const AdminLayout = ({ children }) => {
  return (
    <>
      {/* <Container> */}
        <Row>
        <SideBar />
          <Col md={10}>

          {children}
          <Outlet />
          </Col>
        </Row>
      {/* </Container> */}
    </>
  );
};
