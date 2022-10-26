import React from "react";
import { Card } from "react-bootstrap";

export const Banner = ({ img, title }) => {
  return (
    <Card className="bg-dark text-white">
      {/* <Ratio aspectRatio={20}> */}
        <Card.Img src={img} alt="" className="img-fluid " />
      {/* </Ratio> */}
      <Card.ImgOverlay>
        <Card.Title>{title}</Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
};
