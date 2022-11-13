import styles from "./ProductPage.module.css";

export const CategoryBanner = () => {
  return (
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
  );
};
