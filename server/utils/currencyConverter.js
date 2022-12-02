const fetch = require("node-fetch").default;

class CurrencyConverter {
  constructor(to, from) {
    if (!from || !to) throw new Error("please provide details");
    this.convertFrom = from.toUpperCase();
    this.convertTo = to.toUpperCase();
  }

  async convert(amount) {
    const exchangeApi = "https://open.er-api.com/v6/latest/USD";
    const res = await fetch(exchangeApi);
    const data = await res.json();
    if (!res.ok) throw new Error("converter api on leave please look up");
    // console.log(data);


    // console.log(this.convertFrom, this.convertTo);

    const from = data?.rates[this.convertFrom];
    const to = data?.rates[this.convertTo];

    return (from / to) * parseInt(amount);
  }
}

module.exports = CurrencyConverter;

// const currencyConvert = new CurrencyConverter("INR", "USD");
// const as = currencyConvert.convert("1").then((res) => console.log(res));
// console.log( as)
