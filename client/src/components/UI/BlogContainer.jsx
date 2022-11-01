import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SideBar } from "../user/blog/SideBar";
import { Banner } from "./Banner";

export const BlogContainer = ({ children, img, searchInput, onSearch }) => {
  return (
    <>
      <Banner img={img} />
      <Container>
        <Row>
          <Col lg={8}>{children}</Col>
          <SideBar searchInput={searchInput} onSearch={onSearch} />
        </Row>
      </Container>
    </>
  ); 
};
