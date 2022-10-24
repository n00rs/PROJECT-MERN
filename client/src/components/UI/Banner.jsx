import React from "react";
import { Card, Container } from "react-bootstrap";

export const Banner = ({ img, title }) => {
  return (
   
      <Card className="bg-dark text-white">
        <Card.Img src={img} alt="" className="img-fluid" />
        <Card.ImgOverlay>
          <Card.Title>{title}</Card.Title>
        </Card.ImgOverlay>
      </Card>
    
  );
};
