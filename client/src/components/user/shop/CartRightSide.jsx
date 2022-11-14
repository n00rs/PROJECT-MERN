import styles from "./CartStyles.module.css";

export const CartRightSide = () => {
  const cartItem = (
    <div className="row mx-0 py-4 g-0 border-bottom">
      <div className="col-2 position-relative">
        <span className={styles["checkout-item-qty"]}>3</span>
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
            <i className={`{${styles["ri-close-line"]} ms-3`}></i>
          </h6>
          <span className="d-block text-muted fw-bolder text-uppercase fs-9">Size: 9 / Qty: 1</span>
        </div>
        <p className=" text-end text-muted m-0">$85.00</p>
      </div>
    </div>
  );
  return (
    <div className="p-4 py-lg-0 pe-lg-0 ps-lg-5">
      <div className="pb-3">
      
        {cartItem}

      </div>
      <div className="py-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="m-0 fw-bolder fs-6">Subtotal</p>
          <p className="m-0 fs-6 fw-bolder">$422.99</p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0 fw-bolder fs-6">Shipping</p>
          <p className="m-0 fs-6 fw-bolder">$8.95</p>
        </div>
      </div>
      <div className="py-4 border-bottom">
        <div className="d-flex justify-content-between">
          <div>
            <p className="m-0 fw-bold fs-5">Grand Total</p>
            <span className="text-muted small">Inc $45.89 sales tax</span>
          </div>
          <p className="m-0 fs-5 fw-bold">$422.99</p>
        </div>
      </div>
      <div className="py-4">
        <div className="input-group mb-0">
          <input type="text" className="form-control" placeholder="Enter your coupon code" />
          <button className="btn btn-dark btn-sm px-4">Apply</button>
        </div>
      </div>
    </div>
  );
};
