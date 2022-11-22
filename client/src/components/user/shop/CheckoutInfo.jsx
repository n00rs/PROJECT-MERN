// import { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
// import { USER_DATA_API } from "../../../api";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import styles from "./CartStyles.module.css";

export const CheckoutInfo = () => {
  return (
    <>
      <ul className="list-group mb-5 d-none d-lg-block rounded-0">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-start align-items-center">
            <span className="text-muted small me-2 f-w-36 fw-bolder">Contact</span>
            <span className="small">test@email.com</span>
          </div>
          <a href="./checkout.html" className="text-muted small" role="button">
            Change
          </a>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-start align-items-center">
            <span className="text-muted small me-2 f-w-36 fw-bolder">Deliver To</span>
            <span className="small">123 Street, London, SM3 5TY, United Kingdom</span>
          </div>
          <a href="./checkout-shipping.html" className="text-muted small" role="button">
            Change
          </a>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-start align-items-center">
            <span className="text-muted small me-2 f-w-36 fw-bolder">Method</span>
            <span className="small">UPS Priority Delivery</span>
          </div>
          <a href="./checkout-shipping.html" className="text-muted small" role="button">
            Change
          </a>
        </li>
      </ul>
      <h3 className="fs-5 fw-bolder mb-4 border-bottom pb-4">Payment Information</h3>

      <Row>
        {/* <!-- Payment Option--> */}
        <Col xs={12}>
          <div
            className={`form-check form-group ${styles["form-check-custom"]} ${styles["form-radio-custom"]} mb-3`}
          >
            <input
              className="form-check-input"
              type="radio"
              name="checkoutPaymentMethod"
              id="checoutPaymentStripe"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="checoutPaymentStripe">
              <span className="d-flex justify-content-between align-items-start">
                <span>
                  <span className="mb-0 d-block">Credit Card (Stripe)</span>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 8H4v8h16v-8zm0-2V5H4v4h16zm-6 6h4v2h-4v-2z"
                  />
                </svg>
              </span>
            </label>
          </div>
        </Col>

        {/* <!-- Payment Option--> */}
        <Col xs={12}>
          <div
            className={`form-check form-group ${styles["form-check-custom"]} ${styles["form-radio-custom"]} mb-3`}
          >
            <input
              className="form-check-input"
              type="radio"
              name="checkoutPaymentMethod"
              id="checkoutPaymentPaypal"
            />
            <label className="form-check-label" htmlFor="checkoutPaymentPaypal">
              <span className="d-flex justify-content-between align-items-start">
                <span>
                  <span className="mb-0 d-block">PayPal</span>
                </span>
                {/* <!-- <i className="ri-paypal-line"></i> --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M8.495 20.667h1.551l.538-3.376a2.805 2.805 0 0 1 2.77-2.366h.5c2.677 0 4.06-.983 4.55-3.503c.208-1.066.117-1.73-.171-2.102c-1.207 3.054-3.79 4.16-6.962 4.16h-.884c-.384 0-.794.209-.852.58l-1.04 6.607zm-4.944-.294a.551.551 0 0 1-.544-.637L5.68 2.776A.92.92 0 0 1 6.59 2h6.424c2.212 0 3.942.467 4.899 1.558c.87.99 1.123 2.084.871 3.692c.36.191.668.425.916.706c.818.933.978 2.26.668 3.85c-.74 3.805-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.679l-.702 4.383a.804.804 0 0 1-.794.679H6.72a.483.483 0 0 1-.477-.558l.274-1.736H3.55zm6.836-8.894h.884c3.19 0 4.895-1.212 5.483-4.229c.02-.101.037-.203.053-.309c.166-1.06.05-1.553-.398-2.063c-.465-.53-1.603-.878-3.396-.878h-5.5L5.246 18.373h1.561l.73-4.628l.007.001a2.915 2.915 0 0 1 2.843-2.267z"
                  />
                </svg>
              </span>
            </label>
          </div>
        </Col>
      </Row>
      <div className={`${styles["paypal-details"]} bg-light p-4 my-3`}>
        Please click on complete order. You will then be transferred to Paypal to enter your payment
        details.
      </div>
      <div className="form-group form-check m-0">
        <input type="checkbox" className="form-check-input" id="accept-terms" defaultChecked />
        <label className="form-check-label fw-bolder" htmlFor="accept-terms">
          I agree to OldSkool's <Link>terms & conditions</Link>
        </label>
      </div>

      <div className="pt-5 mt-5 pb-5 border-top d-flex flex-column flex-md-row justify-content-between align-items-center">
        <a
          href="./checkout-shipping.html"
          className="btn ps-md-0 btn-link text-dark w-100 w-md-auto mb-2 mb-md-0"
          role="button"
        >
          Back to shipping
        </a>
        <button className="btn btn-dark w-100 w-md-auto">Complete Order</button>
      </div>
    </>
  );
};
