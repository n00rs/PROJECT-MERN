import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { CartBreadcrumb } from "../components/user/shop/CartBreadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../store/shopSlice";
import { CartTab, SideContent } from "../components/user/shop/CartTab";
import { CartRightSide } from "../components/user/shop/CartRightSide";
import { CheckoutInfo } from "../components/user/shop/CheckoutInfo";
import { CheckOutAddressForm } from "../components/user/shop/AddressForm";
import { toast } from "react-toastify";
import styles from "../components/user/shop/CartStyles.module.css";

const Cart = () => {
  const [navlink, setNavlink] = useState("cart");

  const dispatch = useDispatch();

  const { cart, error, fetchingCart } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  const changeNav = (link) => setNavlink(link);

  if (error) toast.error(error);
  return (
    <section className='"mt-0 overflow-lg-hidden vh-lg-100"'>
      <Container>
        <Row className="g-0 vh-lg-100">
          <div className="col-12 col-lg-7 pt-5 pt-lg-10">
            <div className="pe-lg-5">
              <CartBreadcrumb handleNavlinks={changeNav} activeLink={navlink} />
              <div className="mt-5">
                {navlink === "cart" && <CartTab />}
                {navlink === "address" && <CheckOutAddressForm />}
                {navlink === "payment" && <CheckoutInfo />}
              </div>
            </div>
          </div>
          <div
            className={`col-12 col-lg-5 bg-light pt-lg-10 ${styles["aside-checkout"]} pb-5 pb-lg-0 my-5   my-lg-0`}
          >
            {navlink === "cart" ? <SideContent handleNavlinks={changeNav} /> : <CartRightSide />}
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
