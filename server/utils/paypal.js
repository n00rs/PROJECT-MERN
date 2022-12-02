// const axios = require("axios").default;
// const qs = require("querystring");
const fetch = require("node-fetch");
const { PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env;

const base = "https://api-m.sandbox.paypal.com";

class Paypal {
  //creating order

  static async createOrder({ orderId, amount }) {
    if (!orderId || !amount)
      throw new Error("please provide orderId and amount to create paypal order");

    const purchaseAmount = amount.toFixed(2);
    const accessToken = await this.generateAccessToken();

    const url = `${base}/v2/checkout/orders`;
    const body = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: orderId.toString(),
          amount: { currency_code: "USD", value: purchaseAmount },
        },
      ],
    };

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    });

    return this.handleResponse(res);
  }

  //capturing payment of order

  static async capturePayment(orderId) {
    console.log(orderId, "capture pay");
    const accessToken = await this.generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    });

    return this.handleResponse(res);
  }

  //for retrieving  payment details

  static async fetchPayment(paymentId) {
    const accessToken = await this.generateAccessToken();
    const res = await fetch(`${base}/v1/payments/capture/${paymentId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    });
    return this.handleResponse(res);
  }

  //client token

  static async generateClientToken() {
    const accessToken = await this.generateAccessToken();
    const res = await fetch(`${base}/v1/identity/generate-token`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Accept-Language": "en_US",
        "Content-Type": "application/json",
      },
    });
    const jsonData = await this.handleResponse(res);
    // console.log(jsonData);
    return jsonData.client_token;
    // const
  }

  static async generateAccessToken() {
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_SECRET).toString("base64");
    // console.log(auth);
    // var string = qs.stringify({ grant_type: "client_credentials" });
    // console.log(string);
    const res = await fetch(`${base}/v1/oauth2/token`, {
      method: "post",
      body: "grant_type=client_credentials",
      headers: { Authorization: `Basic ${auth}` },
    });

    const jsonData = await this.handleResponse(res);
    return jsonData.access_token;
  }

  static async handleResponse(res) {
    if (res.status === 200 || res.status === 201) {
      const data = await res.json();
      // console.log(data);
      return data;
    }
    const errMsg = await res.text();
    console.log(errMsg);
    throw new Error(errMsg);
  }
}

module.exports = Paypal;
