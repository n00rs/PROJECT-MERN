// import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
// import { USER_DATA_API } from "../../../api";
// import { toast } from "react-toastify";
import styles from "./CartStyles.module.css";
import { RazorPay } from "../../../assets/icons/RazorPay";
import Swal from "sweetalert2";
import { NEWORDER_API } from "../../../api";
import { popupRazor } from "../../../utils/razorpay";
import { PaypalBtn } from "../../UI/PaypalBtn";
import { CodIcon } from "../../../assets/icons/CodIcon";
import { StipeIcon } from "../../../assets/icons/StipeIcon";
import { PaypalIcon } from "../../../assets/icons/PaypalIcon";

export const CheckoutInfo = () => {
  const { userData, orderDetails } = useSelector((state) => state.shop);

  const navigate = useNavigate();

  const [payment, setPayment] = useState();

  const address = userData?.address?.find((add) => add._id === orderDetails.addressId);

  const paymentOption = (e) => setPayment(e.target.value);

  const orderHandler = async () => {
    const body = JSON.stringify({ ...orderDetails, payment });
    // console.log(body);
    try {
      Swal.fire({
        title: "",
        text: "Loading...",
        imageUrl: "https://www.boasnotas.com/img/loading2.gif",
        showCloseButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      const res = await fetch(NEWORDER_API, {
        method: "POST",
        body: body,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const resData = await res.json();
      if (!res.ok) throw resData;
      const { payment, data } = resData;
      Swal.close();

      switch (payment) {
        case "COD":
          if (data === "success") navigate("/shop", { replace: true });
          break;
        case "RAZORPAY":
          console.log(data);
          popupRazor({ data, address }, navigate);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ul className="list-group mb-5 d-none d-lg-block rounded-0">
        <LiAddress fieldName={"Contact"} value={address?.phone} />
        <LiAddress
          fieldName={"Delive To"}
          value={`${address?.address} , ${address?.city} , ${address?.state} , ${address?.pincode}`}
        />
        <LiAddress fieldName={"LandMark"} value={address?.landmark} />
      </ul>
      <h3 className="fs-5 fw-bolder mb-4 border-bottom pb-4">Payment Information</h3>

      <Row>
        <SelectPayment option={"COD"} svg={<CodIcon />} onChange={paymentOption} />
        <SelectPayment option={"RAZORPAY"} svg={<RazorPay />} onChange={paymentOption} />
        <SelectPayment option={"STRIPE"} svg={<StipeIcon />} onChange={paymentOption} />
        <SelectPayment option={"PAYPAL"} svg={<PaypalIcon />} onChange={paymentOption} />
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
        <button className="btn ps-md-0 btn-link text-dark w-100 w-md-auto mb-2 mb-md-0">
          Back to shipping
        </button>
        {payment === "PAYPAL" ? (
          <PaypalBtn />
        ) : (
          <button className="btn btn-dark w-100 w-md-auto" onClick={orderHandler}>
            Complete Order
          </button>
        )}
      </div>
    </>
  );
};

function LiAddress({ fieldName, value }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-start align-items-center">
        <span className="text-muted small me-2 f-w-36 fw-bolder">{fieldName}</span>
        <span className="small">{value}</span>
      </div>
      <a href="./checkout.html" className="text-muted small" role="button">
        Change
      </a>
    </li>
  );
}

function SelectPayment({ onChange, option, svg, value }) {
  return (
    <Col xs={12}>
      <div
        className={`form-check form-group ${styles["form-check-custom"]} ${styles["form-radio-custom"]} mb-3`}
      >
        <input
          className="form-check-input"
          type="radio"
          name="checkoutPaymentMethod"
          id={value}
          value={option}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor={value}>
          <span className="d-flex justify-content-between align-items-start">
            <span>
              <span className="mb-0 d-block">{option}</span>
            </span>
            {svg}
          </span>
        </label>
      </div>
    </Col>
  );
}
