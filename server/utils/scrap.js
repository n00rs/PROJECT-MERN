const { default: axios } = require("axios");
const { JSDOM } = require("jsdom");
const { default: fetch } = require("node-fetch");

const techUrl = "https://economictimes.indiatimes.com/tech";
const fashionUrl = "https://fashionunited.in/news/fashion";

class Scrap {
  static async techNews() {
    //   const res = await axios(techUrl);
    const res = await fetch(techUrl);
    const data = await res.text();

    //   console.log(res.data);
    // console.log(data);
    const { document } = new JSDOM(data).window;

    const a = [];
    document.querySelectorAll(".techBox").forEach((i) => {
      a.push({
        image: i.querySelector("img").getAttribute("data-original"),
        link: `https://economictimes.indiatimes.com${i.querySelector(".imageHolder a").href}`,
        title: i.querySelector("a h3").textContent,
        content: i.querySelector(".imgPara p").textContent,
        publishedAt: i.querySelector("time").innerHTML,
      });
    });
    return a;
  }

  static async fashionNews() {
    const res = await fetch(fashionUrl);
    const data = await res.text();
    // console.log(data);
    const { document } = new JSDOM(data).window;
    const a = [];
    const selector = document.querySelectorAll(".css-4cgb18");
    selector.forEach((i) => {
      a.push({
        image: i.querySelector("img").src,
        link: `https://fashionunited.in${i.querySelector("a").href}`,
        title: i.querySelector(" .MuiTypography-h5 ").textContent,
        content: i.querySelector(".MuiTypography-body2 ").textContent,
        publishedAt: i.querySelector(".MuiTypography-caption").innerHTML,
      });
    });
    return a;
  }
}

module.exports = Scrap;
// Scrap.techNews();
// Scrap.fashionNews();
