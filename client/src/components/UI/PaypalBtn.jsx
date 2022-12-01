import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { PAYPAL_CLIENT_TOKEN, PAYPAL_ORDER_API } from "../../api";
import { toast } from "react-toastify";
export const PaypalBtn = () => {
  const [clientId, setClientId] = useState("");

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

  const createOrder = async (orderData) => {
    try {
      const res = await fetch(PAYPAL_ORDER_API, {
        method: "POST",
        body: JSON.stringify(orderData),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw data;
      return data.id;
    } catch (err) {
      console.log(err.message);
      toast.error("error in paypal create order");
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const res = await fetch(`${PAYPAL_ORDER_API}/${data.orderID}/capture`, {
        method: "POST",
        credentials: "include",
      });

      const resData = await res.json();
      console.log(resData);
    } catch (err) {
      console.error(err);
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
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} fundingSource="paypal" />
    </PayPalScriptProvider>
  );
};
// new <Cu></Cu>s
