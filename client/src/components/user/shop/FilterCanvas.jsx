import React from "react";
import { Offcanvas } from "react-bootstrap";

export const FilterCanvas = ({show,close}) => {
  return (
    <Offcanvas show={show} onHide={close} >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>FILTER</Offcanvas.Title>
      </Offcanvas.Header>
    </Offcanvas>
  );
};
