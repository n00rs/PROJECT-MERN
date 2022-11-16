import React, { useEffect, useState } from "react";
// import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ViewProdDetails } from "../components/user/shop/ViewProdDetails";
import { ViewProdImg } from "../components/user/shop/ViewProdImg";
import styles from "../components/user/shop/ViewProduct.module.css";
import { FETCH_EACH_PROD_URL } from "../Constant";

const ViewProduct = () => {
  const { prodId } = useParams();
  const { products } = useSelector((state) => state.shop);
  const [prod, setProduct] = useState(null);
  console.log(prodId);
  // console.log(prod);

  useEffect(() => {
    const prods = products.find((prod) => prod._id === prodId);
    if (prods) setProduct(prods);
    else
      fetch(FETCH_EACH_PROD_URL + prodId)
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "fe");
          setProduct(data);
        })
        .catch((e) => {
          console.log(e);
          toast.error(e.message);
        });
  }, []);

  console.log(prod, "prod");

  return (
    <section className="mt-0">
      <div className="py-6" style={{ backgroundColor: "#00132e" }}>
        <Container className="mt-5" fluid>
          <nav className="m-0" aria-label="breadcrumb">
            <ol className={`${styles.breadcrumb} m-0`}>
              <li className={`${styles["breadcrumb-item"]} breadcrumb-light`}>
                <a href="/">Home</a>
              </li>
              <li className={`${styles["breadcrumb-item"]} breadcrumb-light`}>
                <a href="/">T-Shirts</a>
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
              {prod?.images?.map((img) => (
                <ViewProdImg imgSrc={img} key={img} />
              ))}
            </Row>
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            {prod && <ViewProdDetails product={prod} />}
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default ViewProduct;
