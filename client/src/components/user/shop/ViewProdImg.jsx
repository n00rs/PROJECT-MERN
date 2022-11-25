import styles from "./ViewProduct.module.css";

export const ViewProdImg = ({ imgSrc }) => {
  return (
    <div className="col-12">
      <picture>
        <img
          className="img-fluid"
          data-zoomable
          src={
            imgSrc
              ? imgSrc
              : "https://oldskool-html-bootstrap.vercel.app/assets/images/products/product-page-1.jpeg"
          }
          alt=""
        />
      </picture>
    </div>
  );
};
