import React from "react";
import { Container, Row } from "react-bootstrap";
import { ViewProdDetails } from "../components/user/shop/ViewProdDetails";
import { ViewProdImg } from "../components/user/shop/ViewProdImg";
import styles from "../components/user/shop/ViewProduct.module.css";
const ViewProduct = () => {
  return (
    <section className="mt-0">
      <div className="py-6" style={{ backgroundColor: "#00132e" }}>
        <Container className="mt-5" fluid>
          <nav className="m-0" aria-label="breadcrumb">
            <ol className={`${styles.breadcrumb} m-0`}>
              <li className={`${styles["breadcrumb-item"]} breadcrumb-light`}>
                <a href="#">Home</a>
              </li>
              <li className={`${styles["breadcrumb-item"]} breadcrumb-light`}>
                <a href="#">T-Shirts</a>
              </li>
              <li
                className={`${styles["breadcrumb-item"]} breadcrumb-light active`}
                aria-current="page"
              >
                Osaka Japan Mens T-Shirt
              </li>
            </ol>
          </nav>
        </Container>
      </div>
      <Container className="mt-5" fluid>
        <Row className="">
          <div className="col-12 col-md-6 col-xl-7">
            <Row className="g-3 p-5">
              <ViewProdImg />
              <ViewProdImg />
              <ViewProdImg />
              <ViewProdImg />
            </Row>
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <ViewProdDetails />
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default ViewProduct;
