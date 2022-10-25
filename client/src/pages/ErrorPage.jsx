import React from "react";
import img from "../assets/404 (2).jpg";
import { Card } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";




const ErrorPage = () => {
const error = useRouteError()
console.log(error.message);
  return (
    <Card className="bg-dark ">
      <Card.Img src={img} alt="Card image" className="img-fluid" />
      <Card.ImgOverlay>
        <Card.Title className="text-center ">
          <Link className="btn btn-outline-success mt-5" to ='/'> Go Home.........</Link>
        </Card.Title>
        <h3 className="text-center text-danger">{error.message}</h3>
      </Card.ImgOverlay>
    </Card>
  );
};

export default ErrorPage;
