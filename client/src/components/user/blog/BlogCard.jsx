import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const BlogCard = ({ title, date, image, id, content }) => {
  return (
    <Col>
      <Card >
        <Card.Img src={image} className="card-img-top" />
        <Card.Body>
          <div className="small text-muted">{date}</div>
          <Card.Title className=" h4">{title}</Card.Title>

          <Card.Text>{content}....</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to={`${id}`} >Click to See more</Link>
        </Card.Footer>
      </Card>
     </Col>
  );
};
