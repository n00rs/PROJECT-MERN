import React from "react";
import { Offcanvas } from "react-bootstrap";
import { AddProductForm } from "./AddProductForm";

export const UpdateProdCanvas = ({ show, dispatch, updateProdValues }) => {
  const hide = () => dispatch({ type: "HIDECANVAS" });

  return (
    <Offcanvas show={show} onHide={hide} className="text-bg-dark offcanvas-size-xxl">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>UPDATE PRODUCTS</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ color: "InfoText" }}>
        <AddProductForm updateProdValues={updateProdValues} />
        {updateProdValues?.images?.map((img) => (
          <img src={img} alt="" key={Math.random()} style={{ width: "200px", height: "200px" }} />
        ))}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
