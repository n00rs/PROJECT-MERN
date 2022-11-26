import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { RAZORPAY_SUCCESS_API } from "../api";

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = (e) => {
      console.log(e);
      reject("err in script");
    };
    document.body.append(script);
  });
};

export const popupRazor = async ({ data, address }, navigate) => {
  const load = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  //   console.log(data);

  const { amount, id, receipt: orderId, currency } = data;

  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    amount,
    currency,
    name: "test",
    description: "testing",
    order_id: id,

    handler: async (res) => {
      console.log(res);

      const data = {
        orderId,
        razorpayPaymentId: res.razorpay_payment_id,
        razorpayOrderId: res.raorpay_order_id,
        razorpaySignature: res.razorpay_signature,
      };

      const response = await fetch(RAZORPAY_SUCCESS_API, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const resData = await response.json();

      if (!response.ok) throw resData;

      navigate("/shop", { replace: true });
      toast("payment success");
    },
    prefill: {
      name: "jon doe",
      email: "jondoe@gmail.com",
      phone: address.phone,
    },
    notes: {
      address: address.address,
    },
    theme: {
      color: "#61dafb",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  paymentObject.on("payment.failed", (res) => {
    console.log(res);
    toast.error(res.error.description);
    toast.error(res.error.reason);
  });
};
