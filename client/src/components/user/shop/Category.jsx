import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FilterIcon } from "../../../assets/icons/FilterIcon";
import { ProductCard } from "./ProductCard";
import styles from "./ProductPage.module.css";

export const Category = () => {
  const [searchParam, setSearchParams] = useSearchParams();

  const categ = searchParam.get("category");

  if (!categ) {
    setSearchParams("category", "all");
  }
  console.log(categ);
  return (
    <section className="mt-0 p-2">
      <div
        className={`${styles["py-10"]} ${styles["bg-img-cover"]} ${styles["bg-overlay-dark"]} position-relative overflow-hidden ${styles["bg-pos-center-center"]} rounded-0`}
        style={{
          backgroundImage:
            "url(https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-category-top.jpg)",
        }}
      >
        <div
          className={`container-fluid position-relative ${styles["z-index-20"]}`}
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <h1 className="fw-bold display-6 mb-4 text-white">Latest Arrivals</h1>
          <div className="col-12 col-md-6">
            <p className="text-white mb-0 fs-5">
              When it's time to head out and get your Kicks on, have a look at our latest arrivals.
              Whether you're into Nike, Adidas, Dunks or New Balance, we really have something for
              everyone!
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        {/* <!-- Category Toolbar--> */}
        <div className="d-flex justify-content-between items-center pt-5 pb-4 flex-column flex-lg-row">
          <div>
            <nav aria-label="breadcrumb">
              <ol className={styles["breadcrumb"]}>
                <li className={styles["breadcrumb-item"]}>
                  <Link to="/shop">SHOP</Link>
                </li>
                <li className={styles["breadcrumb-item"]}>
                  <Link>Products</Link>
                </li>

                <li className={`${styles["breadcrumb-item"]} active`} aria-current="page">
                  {categ}
                </li>
              </ol>
            </nav>
            <h1 className="fw-bold fs-3 mb-2">New Releases (121)</h1>
            <p className="m-0 text-muted small">Showing 1 - 9 of 121</p>
          </div>
          <div className="d-flex justify-content-end align-items-center mt-4 mt-lg-0 flex-column flex-md-row">
            <button
              className="btn bg-light p-3 me-md-3 d-flex align-items-center fs-7 lh-1 w-100 mb-2 mb-md-0 w-md-auto"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasFilters"
              aria-controls="offcanvasFilters"
            >
              <FilterIcon />
              Filters
            </button>
            {/* <!-- / Filter Trigger--> */}

            {/* <!-- Sort Options--> */}
            <select className="form-select form-select-sm border-0 bg-light p-3 pe-5 lh-1 fs-7">
              <option>Sort By</option>
              <option defaultValue="1">Hi Low</option>
              <option defaultValue="2">Low Hi</option>
              <option defaultValue="3">Name</option>
            </select>
            {/* <!-- / Sort Options--> */}
          </div>
        </div>
      </div>
      <div className="row g-4">
        <ProductCard />
      </div>
      <div class={`d-flex flex-column ${styles["f-w-44"]} mx-auto my-5 text-center`}>
        <small class="text-muted">Showing 9 of 121 products</small>
        <div class={`${styles["progress"]} ${styles["f-h-1"]}  mt-3"`}>
          <div
            class={`${styles["progress-bar"]} bg-dark`}
            role="progressbar"
            style={{ width: "25%" }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <a href="#" class="btn btn-outline-dark btn-sm mt-5 align-self-center py-3 px-4 border-2">
          Load More
        </a>
      </div>
    </section>
  );
};
