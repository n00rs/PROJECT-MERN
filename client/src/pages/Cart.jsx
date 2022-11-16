import React from "react";
import { Container, Row } from "react-bootstrap";
import CartBreadcremb from "../components/user/shop/CartBreadcremb";
import { CartTab, SideContent } from "../components/user/shop/CartTab";
import styles from "../components/user/shop/CartStyles.module.css";
import { CartRightSide } from "../components/user/shop/CartRightSide";
import { CheckOutAddressForm, CheckoutInfo } from "../components/user/shop/CheckoutInfo";
const Cart = () => {
  return (
    <section className='"mt-0 overflow-lg-hidden vh-lg-100"'>
      <Container>
        <Row className="g-0 vh-lg-100">
          <div className="col-12 col-lg-7 pt-5 pt-lg-10">
            <div className="pe-lg-5">
              <CartBreadcremb />
              <div className="mt-5">
                {/* <CartTab /> */}
                <CheckoutInfo />
                {/* <CheckOutAddressForm/> */}
              </div>
            </div>
          </div>
          <div
            className={`col-12 col-lg-5 bg-light pt-lg-10 ${styles["aside-checkout"]} pb-5 pb-lg-0 my-5 my-lg-0`}
          >
            {/* <SideContent /> */}
            <CartRightSide />
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
