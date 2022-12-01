import React from "react";
import { Link } from "react-router-dom";

import styles from "./BrandSection.module.css";

export const LandingBontent3 = () => {
  const LandCard = ({ category, link, img }) => (
    <div className="col-12 col-md-6 d-flex">
      <div className={`card ${styles["card"]} position-relative overflow-hidden`}>
        <picture className={`position-relative ${styles["z-index-10"]} d-block bg-light`}>
          <img className="w-100 rounded" src={img} alt="" />
        </picture>
        <div className={`${styles["card-overlay"]}`}>
          <p className="lead fw-bolder mb-2">The Jordan Delta 2</p>
          <Link
            to={link}
            className={`"btn ${styles["btn1-psuedo"]} text-white py-2"`}
            role="button"
          >
            {category}
          </Link>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="position-relative row my-lg-7 pt-5 pt-lg-0 g-8 m-5">
        <div className={`${styles["bg-text"]} bottom-0 start-0 end-0`} data-aos="fade-up">
          <h2 className={`${styles["bg-text-title"]} ${styles["opacity-10"]}`}>
            <span className={`${styles["text-outline-dark"]}`}>Old</span>Skool
          </h2>
        </div>
        <div
          className={`"col-12 col-md-6 position-relative ${styles["z-index-20"]} mb-7 mb-lg-0`}
          data-aos="fade-right"
        >
          <p className={`text-muted ${styles["title-small"]}`}>Welcome</p>
          <h3 className="display-3 fw-bold mb-5">
            <span className={`${styles["text-outline-dark"]}`}>OldSkool</span> - streetwear &amp;
            footwear specialists
          </h3>
          <p className="lead">
            We are OldSkool, a leading supplier of global streetwear brands, including names such as
            <a className="text-black" href="./category.html">
              Stussy
            </a>
            ,
            <a className="text-black" href="./category.html">
              Carhartt
            </a>
            ,
            <a className="text-black" href="./category.html">
              Gramicci
            </a>
            ,
            <a className="text-black" href="./category.html">
              Afends
            </a>
            and many more.
          </p>
          <p className="lead">
            With worldwide shipping and unbeatable prices - now's a great time to pick out something
            from our range.
          </p>
          <a href="./category.html" className={`btn ${styles["btn1-psuedo"]}`} role="button">
            Shop New Arrivals
          </a>
        </div>
        <div
          className={`col-12 col-md-6 position-relative ${styles["z-index-20"]} pe-0 `}
          data-aos="fade-left"
        >
          <picture
            className={`${styles["w-50"]} d-block position-relative ${styles["z-index-10"]} border border-white border-4 ${styles["shadow-lg"]}`}
          >
            <img
              className="img-fluid"
              src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-5.jpg"
              alt=""
            />
          </picture>
          <picture
            className={`${styles["w-60"]} d-block ${styles["me-8"]} ${styles["mt-n10"]} ${styles["shadow-lg"]} border border-white border-4 position-relative ${styles["z-index-20"]} ms-auto`}
          >
            <img
              className="img-fluid"
              src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-6.jpg"
              alt=""
            />
          </picture>
          <picture
            className={`${styles["w-50"]} d-block ${styles["me-8"]} ${styles["mt-n7"]} ${styles["shadow-lg"]} border border-white border-4 position-absolute top-0 end-0 ${styles["z-index-0"]}`}
          >
            <img
              className="img-fluid"
              src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-7.jpg"
              alt=""
            />
          </picture>
        </div>
      </div>
      <div className="pt-7 mb-5 mb-lg-10">
        <div className="row g-4">
          <div className="col-12 col-xl-6 position-relative" data-aos="fade-right">
            <picture className={`position-relative ${styles["z-index-10"]}`}>
              <img
                className="w-100 rounded"
                src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-sale.jpg"
                alt=""
              />
            </picture>
            <div
              className={`position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center ${styles["z-index-20"]}`}
            >
              <div className="py-6 px-5 px-lg-10 text-center w-100">
                <h2 className="display-1 mb-3 fw-bold text-white">
                  <span className={`${styles["text-outline-light"]}`}>Flash</span> Sale
                </h2>
                <p className="fs-5 fw-light text-white d-none d-md-block">
                  Our yearly flash sale is now on! Grab yourself a bargain from the world's leading
                  streetwear brands.
                </p>
                <a
                  href="./category.html"
                  className={`btn ${styles["btn1-psuedo"]} text-white`}
                  role="button"
                >
                  Shop All Sale Items
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-6" data-aos="fade-left">
            <div className="row g-4 justify-content-end">
              <LandCard
                category={"all"}
                img="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-8.jpg"
                link="/shop/products/all"
              />
              <LandCard
                category={"men"}
                img="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-9.jpg"
                link="/shop/products/men"
              />
              <LandCard
                category={"women"}
                img="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-10.jpg"
                link="/shop/products/women"
              />
              <LandCard
                category={"all"}
                img="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-11.jpg"
                link="/shop/products/women"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
