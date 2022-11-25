import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { COUPON_API } from "../../../api";
import { applyDiscount } from "../../../store/shopSlice";

export const DiscountInput = () => {
  const ref = useRef();
  const dispatch = useDispatch();

  const { orderDetails } = useSelector((state) => state.shop);

  console.log(ref?.current?.value);

  const couponHandler = async () => {
    console.log(ref?.current?.value.toUpperCase());

    try {
      const code = ref?.current?.value;

      const res = await fetch(`${COUPON_API}?couponCode=${code}`);
      const resData = await res.json();

      if (!res.ok) throw resData;

      dispatch(applyDiscount(resData));
      // console.log(resData, "coupon data");
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }
  };
  const defaultValue = orderDetails?.couponCode;
  return (
    <div className="py-4">
      <div className="input-group mb-0">
        <input
          type="text"
          className="form-control text-uppercase"
          placeholder="Enter your coupon code"
          defaultValue={defaultValue}
          ref={ref}
          disabled={defaultValue ? true : false}
        />
        <button className="btn btn-dark btn-sm px-4" onClick={couponHandler}>
          Apply
        </button>
      </div>
    </div>
  );
};
