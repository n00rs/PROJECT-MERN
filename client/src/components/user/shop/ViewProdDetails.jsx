import { Accordion, Col } from "react-bootstrap";

import styles from "./ViewProduct.module.css";

export const ViewProdDetails = ({ product }) => {
  
  // const size = Object.keys(product?.size);

  // let sizeContent;

  // for (const key in product?.size) {
  //   if (size[key] !== 0) {
  //     sizeContent = (
  //       <div className={`${styles["form-check-option"]} ${styles["form-check-rounded"]}`}>
  //         <input type="radio" name="product-option-sizes" value={key} id={key} />
  //         <label htmlFor={key}>
  //           <small>{key}</small>
  //         </label>
  //       </div>
  //     );
  //   }
  // }

  const sizeContent = Object.entries(product?.size).map((a) => {
    if (a[1] !== 0 && a[0] !== '_id')
      return (
        <div className={`${styles["form-check-option"]} ${styles["form-check-rounded"]}`}>
          <input type="radio" name="product-option-sizes" value={a[0]} id={a[0]} />
          <label htmlFor={a[0]}>
            <small>{a[0]}</small>
          </label>
        </div>
      );
  });
  return (
    <div className="sticky-top top-5">
      <div className="pb-3" data-aos="fade-in">
        <div className="d-flex align-items-center mb-3">
          <p className="small fw-bolder text-uppercase tracking-wider text-muted m-0 me-4">
            {product?.brand}
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
      <h1 className="mb-1 fs-2 fw-bold">{product?.productName}</h1>
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
      <Col md={6}>
        <button className="btn btn-dark w-100 mt-4 mb-0 ">Add To Shopping Bag</button>
      </Col>
      <Col md={6}>
        <button className="btn btn-dark w-100 mt-4 mb-0 ">Add To Shopping Bag</button>
      </Col>
      {/* <button className="btn btn-dark w-100 mt-4 mb-0 ">Add To Shopping Bag</button> */}
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
      <Accordion defaultActiveKey={0} flush>
        <Accordion.Item eventKey={0}>
          <Accordion.Header>Product Details</Accordion.Header>
          <Accordion.Body>{product?.description}</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={1}>
          <Accordion.Header>Delivery & Returns</Accordion.Header>
          <Accordion.Body>
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
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
