import React from "react";
import { Offcanvas } from "react-bootstrap";
import styles from "./ProductPage.module.css";

import { SearchIcon } from "../../../assets/icons/SearchIcon";

export const FilterCanvas = ({ show, close }) => {
  const brandCheck = ["Adidas", "Nike", "Rebook", "Converse", "Puma", "Swal"].map((s) => (
    <div className={`form-group ${styles["form-check-custom"]} mb-1`} key={Math.random()}>
      <input type="checkbox" className="form-check-input" id={s} />
      <label
        className="form-check-label fw-normal text-body flex-grow-1 d-flex align-items-center"
        htmlFor={s}
      >
        {s} <span className="text-muted ms-1 fs-9">(21)</span>
      </label>
    </div>
  ));

  const sizeCheck = ["S", "M", "L", "XL", "XXL", "NONE"].map((s) => (
    <div
      className={`"form-group d-inline-block me-2 mb-2 ${styles["form-check-bg"]} ${styles["form-check-custom"]}`}
      key={Math.random()}
    >
      <input type="checkbox" className={styles["form-check-bg-input"]} id={s} />
      <label className="form-check-label fw-normal" htmlFor={s}>
        {s}
      </label>
    </div>
  ));
  return (
    <Offcanvas show={show} onHide={close} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>FILTER</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex flex-column justify-content-between w-100 h-100">
          <div>
            <div className="py-4  border-top">
              <a
                className={`small text-body text-decoration-none 
                ${styles["text-secondary-hover"]} ${styles["transition-all"]}  ${styles["transition-all"]} 
                 fs-6 fw-bolder d-block ${styles["collapse-icon-chevron"]}`}
                data-bs-toggle="collapse"
                href="#filter-modal-price"
                role="button"
                aria-expanded="true"
                aria-controls="filter-modal-price"
              >
                Price
              </a>
              <div id="filter-modal-price" className={`${styles.collapse} ${styles.show}`}>
                <div className="d-flex justify-content-between align-items-center mt-7">
                  <div className="input-group mb-0 me-2 border">
                    <span
                      className={`input-group-text ${styles["bg-transparent"]} ${styles["fs-7"]} p-2 text-muted border-0`}
                    >
                      $
                    </span>
                    <input
                      type="number"
                      min="00"
                      max="1000"
                      step="1"
                      className="form-control-sm border flex-grow-1 text-muted border-0"
                    />
                  </div>
                  <div className="input-group mb-0 ms-2 border">
                    <span
                      className={`input-group-text ${styles["bg-transparent"]} ${styles["fs-7"]} p-2 text-muted border-0`}
                    >
                      $
                    </span>
                    <input
                      type="number"
                      min="00"
                      max="1000"
                      step="1"
                      className="form-control-sm flex-grow-1 text-muted border-0"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- / Price Filter --> */}

            {/* <!-- Brands Filter --> */}
            <div className="py-4  border-top">
              <a
                className={`small text-body text-decoration-none 
                ${styles["text-secondary-hover"]} ${styles["transition-all"]}  ${styles["transition-all"]} 
                 fs-6 fw-bolder d-block ${styles["collapse-icon-chevron"]}`}
                data-bs-toggle="collapse"
                href="#filter-modal-brands"
                role="button"
                aria-expanded="true"
                aria-controls="filter-modal-brands"
              >
                Brands
              </a>
              <div id="filter-modal-brands" className={`${styles.collapse} ${styles.show}`}>
                <div className="input-group my-3 py-1">
                  <input
                    type="text"
                    className="form-control py-2  rounded"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <span
                    className={`input-group-text ${styles["bg-transparen"]}t p-2 position-absolute top-10 end-0 border-0 ${styles["z-index-20"]}`}
                  >
                    <SearchIcon />
                  </span>
                </div>
                <div className={`${styles["simplebar-wrapper"]}`}>
                  <div className="" data-pixr-simplebar>
                    {brandCheck}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- / Brands Filter --> */}

            {/* <!-- Sizes Filter --> */}
            <div className="py-4 border-top">
              <a
                className={`small text-body text-decoration-none 
               ${styles["text-secondary-hover"]} ${styles["transition-all"]}  ${styles["transition-all"]} 
                fs-6 fw-bolder d-block ${styles["collapse-icon-chevron"]}`}
                data-bs-toggle="collapse"
                href="#filter-modal-sizes"
                role="button"
                aria-expanded="true"
                aria-controls="filter-modal-sizes"
              >
                Sizes
              </a>
              <div id="filter-modal-sizes" className={`${styles.collapse} ${styles.show}`}>
                <div className="mt-3">{sizeCheck}</div>
              </div>
            </div>
            {/* <!-- / Sizes Filter --> */}
          </div>
          {/* <!-- / Filters--> */}

          {/* <!-- Filter Button--> */}
          <div className="border-top pt-3">
            <a
              href="#"
              className="btn btn-dark mt-2 d-block hover-lift-sm hover-boxshadow"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              Done
            </a>
          </div>
          {/* <!-- /Filter Button--> */}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
