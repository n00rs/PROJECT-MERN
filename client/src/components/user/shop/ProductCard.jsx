import React from "react";
import { PlusIcon } from "../../../assets/icons/PlusIcon";
import styles from "./ProductPage.module.css";
export const ProductCard = () => {
  const Card = (
    <div className="col-12 col-sm-6 col-lg-3">
      {/* <!-- Card Product--> */}
      <div
        className={`card ${styles.card} border ${styles["border-transparent"]} position-relative overflow-hidden h-100 transparent`}
      >
        <div className="card-img position-relative">
          <div className={styles["card-badges"]}>
            <span className={` ${styles["badge-card"]} badge text-dark`}>
              <span className="f-w-2 f-h-2 bg-danger rounded-circle d-block me-1"></span>
              Sale
            </span>
          </div>
          <span className={`position-absolute top-0 end-0 p-2 ${styles["z-index-20"]} text-muted`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 512 512">
              <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
            </svg>
          </span>
          <picture className="position-relative overflow-hidden d-block bg-light">
            <img
              className={`w-100 img-fluid position-relative ${styles["z-index-10"]}`}
              title=""
              src="https://oldskool-html-bootstrap.vercel.app/assets/images/products/product-1.jpg"
              alt=""
            />
          </picture>
          <div className={`position-absolute start-0 bottom-0 end-0 ${styles["z-index-20"]} p-2`}>
            <button className={`btn ${styles["btn-quick-add"]}`}>
              <PlusIcon />
              Quick Add
            </button>
          </div>
        </div>
        <div className="card-body px-0 ms-1">
          <a
            className={`text-decoration-none text-black ${styles["link-cover"]}`}
            href="./product.html"
          >
            Nike Air VaporMax 2021
          </a>
          <small className="text-muted d-block">4 colours, 10 sizes</small>
          <p className="mt-2 mb-0 small">
            <s className="text-muted">$329.99</s> <span className="text-danger">$198.66</span>
          </p>
        </div>
      </div>

      {/* <!--/ Card Product--> */}
    </div>
  );
  return (
    <>
      {Card}
      {Card}
      {Card}
      {Card}
      {Card}
      {Card}
      {Card}
      {Card}
      {Card}
      {Card}
      {Card}
      {Card}
      {Card}
      {Card}
      {Card}
    </>
  );
};
