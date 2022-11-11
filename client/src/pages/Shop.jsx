// import { Row, Container } from "react-bootstrap";
// import { Banner } from "../components/UI/Banner";
import LandingCarousel from "../components/user/LandingCarousel";
// import { ShopNav } from "../components/user/shop/Nav";
// import styles from "./Shop.module.css";
import shopBan1 from "../assets/banner-1.png";
import shopBan2 from "../assets/banner-2.png";
import shopBan3 from "../assets/banner-3.png";
import shopBan4 from "../assets/banner-4.png";
import { BrandSection } from "../components/user/shop/BrandSection";
// import { LandingBrandScroll } from "../components/user/shop/LandingBrandScroll";
import { Container } from "react-bootstrap";
import { LandingBontent3 } from "../components/user/shop/LandingBontent3";

const Shop = () => {
  const cont = [
    {
      img: shopBan1,
      header: "Example headline",
      ptage: "Some representative placeholder content for the first slide of the carousel.",
      btnText: "Sale",
    },
    {
      img: shopBan2,
      header: "Example headline",
      ptage: "Some representative placeholder content for the first slide of the carousel.",
      btnText: "Sale",
    },
    {
      img: shopBan3,
      header: "Example headline",
      ptage: "Some representative placeholder content for the first slide of the carousel.",
      btnText: "Sale",
    },
    {
      img: shopBan4,
      header: "Example headline",
      ptage: "Some representative placeholder content for the first slide of the carousel.",
      btnText: "Sale",
    },
  ];
  return (
    <>
      <LandingCarousel contents={cont} />
      <BrandSection />
      <Container fluid>
        <LandingBontent3 />
      </Container>
    </>
  );
};

export default Shop;
