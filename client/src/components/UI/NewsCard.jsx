import React from "react";
import { Row, Card } from "react-bootstrap";

export const NewsCard = ({ imgSrc, title, content, date }) => {
  return (
    <Card className="mb-3">
      <Row className="g-0">
        <Card.Img src={imgSrc} alt="cardImage" className="p-0" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
          <Card.Text>
            <small className="text-muted"> publised on {date} </small>
          </Card.Text>
        </Card.Body>
      </Row>
    </Card>
  );
};
