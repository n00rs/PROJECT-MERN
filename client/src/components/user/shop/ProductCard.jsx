import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "../../../assets/icons/HeartIcon";
import { PlusIcon } from "../../../assets/icons/PlusIcon";
import styles from "./ProductPage.module.css";
// let count = 0;

export const ProductCard = forwardRef(({ product }, ref) => {
  // console.log(count++);
  // console.log(
  //   Object.values(product?.size).filter((a) => a != 0),
  //   "product"
  // );

  // const Card =

  return (
    <div className="col-12 col-sm-6 col-lg-3" ref={ref}>
      <div
        className={`card ${styles.card} border ${styles["border-transparent"]}
         position-relative overflow-hidden h-100 transparent`}
      >
        <div className="card-img position-relative">
          <div className={styles["card-badges"]}>
            <span className={` ${styles["badge-card"]} badge text-dark`}>
              <span className="f-w-2 f-h-2 bg-danger rounded-circle d-block me-1"></span>
              Sale
            </span>
          </div>
          <span className={`position-absolute top-0 end-0 p-2 ${styles["z-index-20"]} text-muted`}>
            <HeartIcon />
          </span>

          <picture className="position-relative overflow-hidden d-block bg-light">
            <img
              className={`w-100 img-fluid position-relative ${styles["z-index-10"]} `}
              title=""
              src={
                product?.images[0].startsWith("http")
                  ? product?.images[0]
                  : "https://oldskool-html-bootstrap.vercel.app/assets/images/products/product-5.jpg"
              }
              alt="imga"
            />
          </picture>

          <div className={`position-absolute start-0 bottom-0 end-0 ${styles["z-index-20"]} p-2`}>
            <button
              className={`btn ${styles["btn-quick-add"]} bg-light`}
              onClick={(e) => {
                e.preventDefault();
                alert("hi");
              }}
            >
              <PlusIcon />
              Quick Add
            </button>
          </div>
        </div>

        <div className="card-body px-0 ms-1">
          <Link
            className={`text-decoration-none text-black ${styles["link-cover"]}`}
            to={`/shop/view-product/${product?._id}`}
          >
            {product?.productName}
          </Link>
          <small className="text-muted d-block">{"sizes"}</small>
          <p className="mt-2 mb-0 small">
            <s className="text-muted">&#8377; 329.99</s>{" "}
            <span className="text-danger">&#8377; {product.price}</span>
          </p>
        </div>
      </div>

      {/* <!--/ Card Product--> */}
    </div>
  );
});
