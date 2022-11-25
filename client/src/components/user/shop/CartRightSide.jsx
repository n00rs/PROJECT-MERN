import { useDispatch, useSelector } from "react-redux";
// import { updateCart } from "../../../store/shopSlice";
import { CartItem } from "../../UI/CartItem";
import { DiscountInput } from "./DiscountInput";
// import styles from "./CartStyles.module.css";

export const CartRightSide = () => {
  // const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.shop);

  const cartItem = cart?.cartItems?.map((item) => <CartItem item={item} key={Math.random()} />);
  const grandTotal = cart?.discountedTotal ? cart?.discountedTotal : cart?.cartTotal;
  return (
    <div className="p-4 ">
      <div className="pb-3">{cartItem}</div>
      <div className="py-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="m-0 fw-bolder fs-6">Subtotal</p>
          <p className="m-0 fs-6 fw-bolder"> &#8377; {cart?.cartTotal}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0 fw-bolder fs-6">discount</p>
          <p className="m-0 fs-6 fw-bolder">&#8377; {cart?.discount}</p>
        </div>
      </div>
      <div className="py-4 border-bottom">
        <div className="d-flex justify-content-between">
          <div>
            <p className="m-0 fw-bold fs-5">Grand Total</p>
            {/* <span className="text-muted small">Inc $45.89 sales tax</span> */}
          </div>
          <p className="m-0 fs-5 fw-bold">&#8377; {grandTotal}</p>
        </div>
      </div>
      <DiscountInput />
    </div>
  );
};
