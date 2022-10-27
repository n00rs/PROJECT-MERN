import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TrashIcon } from "../../../assets/icons/TrashIcon";

export const BlogCard = ({ onDelete, title, date, image, id, content }) => {

  return (
    <Col className="mt-4">
      <Card>
        <Card.Img src={image} className="card-img-top" />
        <Card.Body>
          {onDelete && (
            <button className="btn btn-outline-danger float-end" onClick={()=>onDelete(id)}>
              <TrashIcon />
            </button>
          )}
          <p className="small text-muted">{date}</p>


          <Card.Title className=" h4">{title}</Card.Title>

          <Card.Text>{content}....</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to={`${id}`}>Click to See more</Link>
        </Card.Footer>
      </Card>
    </Col>
  );
};
