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
        <LandingBontent3/>
      </Container>
    </>
  );
};

export default Shop;

// <Row>
//   <div className=" px-1 mx-auto row justify-content-center">
//     <div className="col-xl-9 col-lg-10 col-sm-11 ">
//       <div className={`${styles["cardex"]} pl-4 pl-md-5 pr-3`}>
//         <div className="row">
//           <div className={`${styles["leftSide"]} col-md-6`}>
//             <p className="pt-5 mb-0">Converse All Star</p>
//             <h3 className="pb-3">Make Your Day Comfortable</h3>
//             <button className={`"btn ${styles["btonPink"]} mb-md-5"`}>Shop Now</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </Row>
// <Container>
//   <div className="position-relative row my-lg-7 pt-5 pt-lg-0 g-8 mb-3">
//     <div className="bg-text bottom-0 start-0 end-0 aos-init aos-animate" data-aos="fade-up">
//       <h2 className="bg-text-title opacity-10">
//         <span className="text-outline-dark">Old</span>Skool
//       </h2>
//     </div>
//     <div
//       className="col-12 col-md-6 position-relative z-index-20 mb-7 mb-lg-0 aos-init aos-animate"
//       data-aos="fade-right"
//     >
//       <p className="text-muted title-small">Welcome</p>
//       <h3 className="display-3 fw-bold mb-5">
//         <span className="text-outline-dark">OldSkool</span> - streetwear &amp; footwear
//         specialists
//       </h3>
//       <p className="lead">
//         We are OldSkool, a leading supplier of global streetwear brands, including names such
//         as <a href="./category.html">Stussy</a>, <a href="./category.html">Carhartt</a>,{" "}
//         <a href="./category.html">Gramicci</a>, <a href="./category.html">Afends</a> and many
//         more.
//       </p>
//       <p className="lead">
//         With worldwide shipping and unbeatable prices - now's a great time to pick out
//         something from our range.
//       </p>
//       <a href="./category.html" className="btn btn-psuedo" role="button">
//         Shop New Arrivals
//       </a>
//     </div>
//     <div
//       className="col-12 col-md-6 position-relative z-index-20 pe-0 aos-init aos-animate"
//       data-aos="fade-left"
//     >
//       <picture className="w-50 d-block position-relative z-index-10 border border-white border-4 shadow-lg">
//         <img
//           className="img-fluid"
//           src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-5.jpg"
//           alt=""
//         />
//       </picture>

//       <picture className="w-50 d-block me-8 mt-n7 shadow-lg border border-white border-4 position-absolute top-0 end-0 z-index-0 ">
//         <img
//           className="img-fluid"
//           src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-5.jpg"
//           alt=""
//         />
//       </picture>
//     </div>
//   </div>
//   <div className="pt-7 mb-5 mb-lg-10 mb-3">
//     <div className="row g-4">
//       <div className="col-12 col-xl-6 position-relative" data-aos="fade-right">
//         <picture className="position-relative z-index-10">
//           <img
//             className="w-100 rounded"
//             src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-sale.jpg"
//             alt=""
//           />
//         </picture>
//         <div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center z-index-20">
//           <div className="py-6 px-5 px-lg-10 text-center w-100">
//             <h2 className="display-1 mb-3 fw-bold text-white">
//               <span className="text-outline-light">Flash</span> Sale
//             </h2>
//             <p className="fs-5 fw-light text-white d-none d-md-block">
//               Our yearly flash sale is now on! Grab yourself a bargain from the world's
//               leading streetwear brands.
//             </p>
//             <a href="./category.html" className="btn btn-psuedo text-white" role="button">
//               Shop All Sale Items
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="col-12 col-xl-6" data-aos="fade-left">
//         <div className="row g-4 justify-content-end">
//           <div className="col-12 col-md-6 d-flex">
//             <div className="card position-relative overflow-hidden">
//               <picture className="position-relative z-index-10 d-block bg-light">
//                 <img
//                   className="w-100 rounded"
//                   src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-8.jpg"
//                   alt=""
//                 />
//               </picture>
//               <div className="card-overlay">
//                 <p className="lead fw-bolder mb-2">The Jordan Delta 2</p>
//                 <a
//                   href="./category.html"
//                   className="btn btn-psuedo text-white py-2"
//                   role="button"
//                 >
//                   Shop Kicks
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-md-6 d-flex">
//             <div className="card position-relative overflow-hidden">
//               <picture className="position-relative z-index-10 d-block bg-light">
//                 <img
//                   className="w-100 rounded"
//                   src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-9.jpg"
//                   alt=""
//                 />
//               </picture>
//               <div className="card-overlay">
//                 <p className="lead fw-bolder mb-2">Latest Mens Shirts</p>
//                 <a
//                   href="./category.html"
//                   className="btn btn-psuedo text-white py-2"
//                   role="button"
//                 >
//                   Shop New
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-md-6 d-flex">
//             <div className="card position-relative overflow-hidden">
//               <picture className="position-relative z-index-10 d-block bg-light">
//                 <img
//                   className="w-100 rounded"
//                   src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-10.jpg"
//                   alt=""
//                 />
//               </picture>
//               <div className="card-overlay">
//                 <p className="lead fw-bolder mb-2">KiiKii Osake Tees</p>
//                 <a
//                   href="./category.html"
//                   className="btn btn-psuedo text-white py-2"
//                   role="button"
//                 >
//                   Shop T-Shirts
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-md-6 d-flex">
//             <div className="card position-relative overflow-hidden">
//               <picture className="position-relative z-index-10 d-block bg-light">
//                 <img
//                   className="w-100 rounded"
//                   src="https://oldskool-html-bootstrap.vercel.app/assets/images/banners/banner-11.jpg"
//                   alt=""
//                 />
//               </picture>
//               <div className="card-overlay">
//                 <p className="lead fw-bolder mb-2">Multibuy Womens Shirts</p>
//                 <a
//                   href="./category.html"
//                   className="btn btn-psuedo text-white py-2"
//                   role="button"
//                 >
//                   Shop Sale Items
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </Container>
