import React from "react";
import styles from "./BrandSection.module.css";

export const LandingBontent3 = () => {
  return (
    <div class="position-relative row my-lg-7 pt-5 pt-lg-0 g-8 m-5">
      <div class={`${styles["bg-text"]} bottom-0 start-0 end-0`} data-aos="fade-up">
        <h2 class={`${styles["bg-text-title"]} ${styles["opacity-10"]}`}>
          <span class={`${styles["text-outline-dark"]}`}>Old</span>Skool
        </h2>
      </div>
      <div
        class={`"col-12 col-md-6 position-relative ${styles["z-index-20"]} mb-7 mb-lg-0`}
        data-aos="fade-right"
      >
        <p class={`text-muted ${styles["title-small"]}`}>Welcome</p>
        <h3 class="display-3 fw-bold mb-5">
          <span class={`${styles["text-outline-dark"]}`}>OldSkool</span> - streetwear &amp; footwear
          specialists
        </h3>
        <p class="lead">
          We are OldSkool, a leading supplier of global streetwear brands, including names such as
          <a class="text-black" href="./category.html">
            Stussy
          </a>
          ,
          <a class="text-black" href="./category.html">
            Carhartt
          </a>
          ,
          <a class="text-black" href="./category.html">
            Gramicci
          </a>
          ,
          <a class="text-black" href="./category.html">
            Afends
          </a>{" "}
          and many more.
        </p>
        <p class="lead">
          With worldwide shipping and unbeatable prices - now's a great time to pick out something
          from our range.
        </p>
        <a href="./category.html" class={`btn ${styles["btn1-psuedo"]}`} role="button">
          Shop New Arrivals
        </a>
      </div>
      <div
        class={`col-12 col-md-6 position-relative ${styles["z-index-20"]} pe-0 `}
        data-aos="fade-left"
      >
        <picture
          class={`${styles['w-50']} d-block position-relative ${styles["z-index-10"]} border border-white border-4 ${styles["shadow-lg"]}`}
        >
          <img
            class="img-fluid"
            src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-5.jpg"
            alt="HTML Bootstrap Template by Pixel Rocket"
          />
        </picture>
        <picture
          class={`${styles['w-60']} d-block ${styles["me-8"]} ${styles["mt-n10"]} ${styles["shadow-lg"]} border border-white border-4 position-relative ${styles["z-index-20"]} ms-auto`}
        >
          <img
            class="img-fluid"
            src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-6.jpg"
            alt="HTML Bootstrap Template by Pixel Rocket"
          />
        </picture>
        <picture
          class={`${styles['w-50']} d-block ${styles["me-8"]} ${styles["mt-n7"]} ${styles["shadow-lg"]} border border-white border-4 position-absolute top-0 end-0 ${styles["z-index-0"]}`}
        >
          <img
            class="img-fluid"
            src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-7.jpg"
            alt="HTML Bootstrap Template by Pixel Rocket"
          />
        </picture>
      </div>
    </div>
  );
};
