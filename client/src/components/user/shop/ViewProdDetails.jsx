import { Col } from "react-bootstrap";
import styles from "./ViewProduct.module.css";

export const ViewProdDetails = () => {
  const sizeContent = ["S", "M", "L", "XL", "XXL", "NONE"].map((a) => (
    <div className={`${styles["form-check-option"]} ${styles["form-check-rounded"]}`}>
      <input type="radio" name="product-option-sizes" value={a} id={a} />
      <label htmlFor={a}>
        <small>{a}</small>
      </label>
    </div>
  ));
  return (
    <div className="sticky-top top-5">
      <div className="pb-3" data-aos="fade-in">
        <div className="d-flex align-items-center mb-3">
          <p className="small fw-bolder text-uppercase tracking-wider text-muted m-0 me-4">
            KiiKii
          </p>
          <div
            className="d-flex justify-content-start align-items-center disable-child-pointer cursor-pointer"
            data-pixr-scrollto
            data-target=".reviews"
          >
            {/* <!-- Review Stars Small--> */}

            <div className={`position-absolute ${styles.stars}}`} style={{ width: "80%" }}>
              <i className={`${styles["ri-star-fill"]} text-dark mr-1`}></i>
              <i className={`${styles["ri-star-fill"]} text-dark mr-1`}></i>
              <i className={`${styles["ri-star-fill"]} text-dark mr-1`}></i>
              <i className={`${styles["ri-star-fill"]} text-dark mr-1`}></i>
            </div>
            <div className={styles.stars}>
              <i className={`${styles["ri-star-fill"]} mr-1 text-muted opacity-25`}></i>
              <i className={`${styles["ri-star-fill"]} mr-1 text-muted opacity-25`}></i>
              <i className={`${styles["ri-star-fill"]} mr-1 text-muted opacity-25`}></i>
              <i className={`${styles["ri-star-fill"]} mr-1 text-muted opacity-25`}></i>
              <i className={`${styles["ri-star-fill"]} mr-1 text-muted opacity-25`}></i>
            </div>
          </div>
          <small className="text-muted d-inline-block ms-2 fs-bolder">(105 reviews)</small>
        </div>
      </div>

      <h1 className="mb-1 fs-2 fw-bold">Kiikii Osaka Japan Mens T-Shirt Limited Edition</h1>
      <div className="d-flex justify-content-between align-items-center">
        <p className="fs-4 m-0">$34.99</p>
      </div>
      <div className="border-top mt-4 mb-3">
        <small className="text-uppercase pt-4 d-block fw-bolder">
          <span className="text-muted">Available Sizes (Mens)</span> :
          <span className="fw-bold">M</span>
        </small>
        <div className="mt-4 d-flex justify-content-start flex-wrap align-items-start">
          {sizeContent}
        </div>
      </div>

      <button className="btn btn-dark w-100 mt-4 mb-0 ">Add To Shopping Bag</button>

      <button className="btn btn-dark w-100 mt-4 mb-0 ">Add To Shopping Bag</button>

      {/* <!-- Product Highlights--> */}
      <div className="my-5">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="text-center">
              <i className={`${styles["ri-24-hours-line"]} ${styles["ri-2x"]}`}></i>
              <small className="d-block mt-1">Next-day Delivery</small>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="text-center px-2">
              <i className={`${styles["ri-secure-payment-line"]} ${styles["ri-2x"]}`}></i>
              <small className="d-block mt-1">Secure Checkout</small>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="text-center px-2">
              <i className={`${styles["ri-service-line"]} ${styles["ri-2x"]}`}></i>
              <small className="d-block mt-1">Free Returns</small>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- / Product Highlights--> */}

      {/* <!-- Product Accordion --> */}
      <div className={styles["accordion"]} id="accordionProduct">
        <div className={styles["accordion-item"]}>
          <h2 className={styles["accordion-header"]} id="headingOne">
            <button
              className={styles["accordion-button"]}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Product Details
            </button>
          </h2>
          <div
            id="collapseOne"
            className={`${styles["accordion-collapse"]} collapse show`}
            aria-labelledby="headingOne"
            data-bs-parent="#accordionProduct"
          >
            <div className={styles["accordion-body"]}>
              <p className="m-0">
                Made from 100% organic cotton, The Kiikii Osaka Japan T-Shirt was created with
                everyday use in mind. It features printed graphics and heavyweight fabric for
                maximum comfort and lifespan.
              </p>
            </div>
          </div>
        </div>
        {/* <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Details & Care
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionProduct"
          >
            <div className="accordion-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex border-0 row g-0 px-0">
                  <span className="col-4 fw-bolder">Composition</span>
                  <span className="col-7 offset-1">98% Cotton, 2% elastane</span>
                </li>
                <li className="list-group-item d-flex border-0 row g-0 px-0">
                  <span className="col-4 fw-bolder">Care</span>
                  <span className="col-7 offset-1">
                    Professional dry clean only. Do not bleach. Do not iron.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
        <div className={styles["accordion-item"]}>
          <h2 className={styles["accordion-header"]} id="headingThree">
            <button
              className={`${styles["accordion-button"]} ${styles.collapsed}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Delivery & Returns
            </button>
          </h2>
          <div
            id="collapseThree"
            className={`${styles["accordion-collapse"]} collapse`}
            aria-labelledby="headingThree"
            data-bs-parent="#accordionProduct"
          >
            <div className={styles["accordion-body"]}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex border-0 row g-0 px-0">
                  <span className="col-4 fw-bolder">Delivery</span>
                  <span className="col-7 offset-1">
                    Standard delivery free for orders over $99. Next day delivery $9.99
                  </span>
                </li>
                <li className="list-group-item d-flex border-0 row g-0 px-0">
                  <span className="col-4 fw-bolder">Returns</span>
                  <span className="col-7 offset-1">
                    30 day return period. See our
                    <a className="text-black" href="#">
                      terms & conditions.
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- / Product Accordion--> */}
    </div>
  );
};
