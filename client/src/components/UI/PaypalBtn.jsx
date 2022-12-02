import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { NEWORDER_API, PAYPAL_CLIENT_TOKEN, PAYPAL_ORDER_API } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const PaypalBtn = ({ orderHandler }) => {
  const [clientId, setClientId] = useState("");
  const navigate = useNavigate();
  // const createClientId = useCallback(() => {
  //   // const
  // }, []);

  useEffect(() => {
    // createClientId();
    const createClientId = async () => {
      const res = await fetch(PAYPAL_CLIENT_TOKEN, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error("server error");
      setClientId(data.clientId);
    };
    createClientId();
  }, []);

  // const createOrder = orderHandler;

  const onApprove = async (data, actions) => {
    try {
      const res = await fetch(`${PAYPAL_ORDER_API}/${data.orderID}/capture`, {
        method: "POST",
        credentials: "include",
      });
      const resData = await res.json();
      if (!res.ok) throw resData;
      // console.log(resData);

      if (resData.data === "success") {
        toast("order placed successfully");
        navigate("/shop");
      }
    } catch (err) {
      console.error(err);
      toast.error("err.message");
    }
  };

  const options = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    "data-client-token": clientId,
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={options}>
      <PayPalButtons createOrder={orderHandler} onApprove={onApprove} fundingSource="paypal" />
    </PayPalScriptProvider>
  );
};
// new <Cu></Cu>s
