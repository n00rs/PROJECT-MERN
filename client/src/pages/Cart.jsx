import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import CartBreadcremb from "../components/user/shop/CartBreadcremb";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../store/shopSlice";
import { CartTab, SideContent } from "../components/user/shop/CartTab";
import { CartRightSide } from "../components/user/shop/CartRightSide";
import { CheckOutAddressForm, CheckoutInfo } from "../components/user/shop/CheckoutInfo";
import { toast } from "react-toastify";
import styles from "../components/user/shop/CartStyles.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, error, fetchingCart } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(fetchCartItems);
  }, []);
  if (error) toast.error(error);
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
