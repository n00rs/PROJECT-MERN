import React from "react";
import img from "../assets/404 (2).jpg";
import { Button, Card, Image } from "react-bootstrap";
const ErrorPage = () => {

  return (
    <Card className="bg-dark">
      <Card.Img src={img} alt="Card image" className="img-fluid" />
      <Card.ImgOverlay>
        <Card.Title className="text-center">
          <Button variant="ouline-dark"> Go Home.........</Button>
        </Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
};

export default ErrorPage;
