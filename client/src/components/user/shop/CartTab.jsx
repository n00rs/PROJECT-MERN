import styles from "./CartStyles.module.css";

export const CartTab = () => {
  return (
    <>
      <h3 className="fs-5 fw-bolder mb-0 border-bottom pb-4">Your Cart</h3>
      <div className="table-responsive">
        <table className="table align-middle">
          <tbody className="border-0">
            {/* <!-- Cart Item--> */}
            <div className="row mx-0 py-4 g-0 border-bottom">
              <div className="col-2 position-relative">
                <picture className="d-block border">
                  <img
                    className="img-fluid"
                    src="https://oldskool-html-bootstrap.vercel.app/assets/images/products/product-cart-1.jpg"
                    alt=""
                  />
                </picture>
              </div>
              <div className="col-9 offset-1">
                <div>
                  <h6 className="justify-content-between d-flex align-items-start mb-2">
                    Nike Air VaporMax 2021
                    <i className={`${styles["ri-close-line"]} ms-3`}></i>
                  </h6>
                  <span className="d-block text-muted fw-bolder text-uppercase fs-9">
                    Size: 9 / Qty: 1
                  </span>
                </div>

                <div className={`${styles["count-box"]} mt-2`}>
                  <button className={styles["count-btn"]}>–</button>
                  <div className={styles["count-num"]}>
                    <input type="text" className={styles["count-inp-box"]} value="1" />
                  </div>
                  <button className={styles["count-btn"]}>+</button>
                </div>

                <p className="fw-bolder text-end text-muted m-0">$85.00</p>
              </div>
            </div>

            <div className="row mx-0 py-4 g-0 border-bottom">
              <div className="col-2 position-relative">
                <picture className="d-block border">
                  <img
                    className="img-fluid"
                    src="https://oldskool-html-bootstrap.vercel.app/assets/images/products/product-cart-2.jpg"
                    alt=""
                  />
                </picture>
              </div>
              <div className="col-9 offset-1">
                <div>
                  <h6 className="justify-content-between d-flex align-items-start mb-2">
                    Nike ZoomX Vaporfly
                    <i className="ri-close-line ms-3"></i>
                  </h6>
                  <span className="d-block text-muted fw-bolder text-uppercase fs-9">
                    Size: 11 / Qty: 1
                  </span>
                </div>
                <p className="fw-bolder text-end text-muted m-0">$125.00</p>
              </div>
            </div>
            {/* <!-- / Cart Item--> */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const SideContent = () => {
  return (
    <div className="p-4">
      <div className="pb-4 border-bottom">
        <div className="d-flex flex-column flex-md-row justify-content-md-between mb-4 mb-md-2">
          <div>
            <p className="m-0 fw-bold fs-5">Grand Total</p>
            <span className="text-muted small">Inc $45.89 sales tax</span>
          </div>
          <p className="m-0 fs-5 fw-bold">$422.99</p>
        </div>
      </div>
      <div className="py-4">
        <div className="input-group mb-0">
          <input type="text" className="form-control" placeholder="Enter coupon code" />
          <button className="btn btn-secondary btn-sm px-4">Apply</button>
        </div>
      </div>
      <a href="./checkout.html" className="btn btn-dark w-100 text-center" role="button">
        Proceed to checkout
      </a>
    </div>
  );
};
