import React from "react";

export const ViewEachProd = () => {
  return (
    <div className="container-fluid mt-5">
      {/* <!-- Product Top Section--> */}
      <div className="row g-9" data-sticky-container>
        {/* <!-- Product Images--> */}
        <div className="col-12 col-md-6 col-xl-7">
          <div className="row g-3" data-aos="fade-right">
            <div className="col-12">
              <picture>
                <img
                  className="img-fluid"
                  data-zoomable
                  src="https://oldskool-html-bootstrap.vercel.app/assets/images/products/product-page-1.jpeg"
                  alt="HTML Bootstrap Template by Pixel Rocket"
                />
              </picture>
            </div>
            <div className="col-12">
              <picture>
                <img
                  className="img-fluid"
                  data-zoomable
                  src="https://oldskool-html-bootstrap.vercel.app/assets/images/products/product-page-2.jpeg"
                  alt="HTML Bootstrap Template by Pixel Rocket"
                />
              </picture>
            </div>
            <div className="col-12">
              <picture>
                <img
                  className="img-fluid"
                  data-zoomable
                  src="https://oldskool-html-bootstrap.vercel.app/assets/images/products/product-page-3.jpeg"
                  alt="HTML Bootstrap Template by Pixel Rocket"
                />
              </picture>
            </div>
            <div className="col-12">
              <picture>
                <img
                  className="img-fluid"
                  data-zoomable
                  src="https://oldskool-html-bootstrap.vercel.app/assets/images/products/product-page-4.jpeg"
                  alt="HTML Bootstrap Template by Pixel Rocket"
                />
              </picture>
            </div>
          </div>
        </div>
        {/* <!-- /Product Images--> */}

        {/* <!-- Product Information--> */}
        <div className="col-12 col-md-6 col-lg-5">
          <div className="sticky-top top-5">
            <div className="pb-3" data-aos="fade-in">
              <div className="d-flex align-items-center mb-3">
                <p className="small fw-bolder text-uppercase tracking-wider text-muted m-0 me-4">
                  KiiKii
                </p>
                <div
                  className="d-flex justify-content-start align-items-center disable-child-pointer cursor-pointer"
                  data-pixr-scrollto
                  data-target=".reviews"
                >
                  {/* <!-- Review Stars Small--> */}
                  <div className="rating position-relative d-table">
                    <div className="position-absolute stars" style={{ width: "80%" }}>
                      <i className="ri-star-fill text-dark mr-1"></i>
                      <i className="ri-star-fill text-dark mr-1"></i>
                      <i className="ri-star-fill text-dark mr-1"></i>
                      <i className="ri-star-fill text-dark mr-1"></i>
                      <i className="ri-star-fill text-dark mr-1"></i>
                    </div>
                    <div className="stars">
                      <i className="ri-star-fill mr-1 text-muted opacity-25"></i>
                      <i className="ri-star-fill mr-1 text-muted opacity-25"></i>
                      <i className="ri-star-fill mr-1 text-muted opacity-25"></i>
                      <i className="ri-star-fill mr-1 text-muted opacity-25"></i>
                      <i className="ri-star-fill mr-1 text-muted opacity-25"></i>
                    </div>
                  </div>{" "}
                  <small className="text-muted d-inline-block ms-2 fs-bolder">(105 reviews)</small>
                </div>
              </div>

              <h1 className="mb-1 fs-2 fw-bold">Kiikii Osaka Japan Mens T-Shirt Limited Edition</h1>
              <div className="d-flex justify-content-between align-items-center">
                <p className="fs-4 m-0">$34.99</p>
              </div>
              <div className="border-top mt-4 mb-3 product-option">
                <small className="text-uppercase pt-4 d-block fw-bolder">
                  <span className="text-muted">Available Sizes (Mens)</span> :{" "}
                  <span className="selected-option fw-bold" data-pixr-product-option="size">
                    M
                  </span>
                </small>
                <div className="mt-4 d-flex justify-content-start flex-wrap align-items-start">
                  <div className="form-check-option form-check-rounded">
                    <input type="radio" name="product-option-sizes" value="S" id="option-sizes-0" />
                    <label for="option-sizes-0">
                      <small>S</small>
                    </label>
                  </div>{" "}
                  <div className="form-check-option form-check-rounded">
                    <input
                      type="radio"
                      name="product-option-sizes"
                      value="SM"
                      id="option-sizes-1"
                    />
                    <label for="option-sizes-1">
                      <small>SM</small>
                    </label>
                  </div>{" "}
                  <div className="form-check-option form-check-rounded">
                    <input
                      type="radio"
                      name="product-option-sizes"
                      value="M"
                      checked
                      id="option-sizes-2"
                    />
                    <label for="option-sizes-2">
                      <small>M</small>
                    </label>
                  </div>{" "}
                  <div className="form-check-option form-check-rounded">
                    <input type="radio" name="product-option-sizes" value="L" id="option-sizes-3" />
                    <label for="option-sizes-3">
                      <small>L</small>
                    </label>
                  </div>{" "}
                  <div className="form-check-option form-check-rounded">
                    <input
                      type="radio"
                      name="product-option-sizes"
                      value="Xl"
                      id="option-sizes-4"
                    />
                    <label for="option-sizes-4">
                      <small>XL</small>
                    </label>
                  </div>{" "}
                  <div className="form-check-option form-check-rounded">
                    <input
                      type="radio"
                      name="product-option-sizes"
                      value="XXL"
                      id="option-sizes-5"
                    />
                    <label for="option-sizes-5">
                      <small>XXL</small>
                    </label>
                  </div>{" "}
                </div>
              </div>
              <div className="mb-3">
                <small className="text-uppercase pt-4 d-block fw-bolder text-muted">
                  Available Designs :
                </small>
                <div className="mt-4 d-flex justify-content-start flex-wrap align-items-start">
                  <picture className="me-2">
                    <img
                      className="f-w-24 p-2 bg-light border-bottom border-dark border-2 cursor-pointer"
                      src="./assets/images/products/product-page-thumb-1.jpeg"
                      alt="HTML Bootstrap Template by Pixel Rocket"
                    />
                  </picture>
                  <picture>
                    <img
                      className="f-w-24 p-2 bg-light cursor-pointer"
                      src="./assets/images/products/product-page-thumb-2.jpeg"
                      alt="HTML Bootstrap Template by Pixel Rocket"
                    />
                  </picture>
                </div>
              </div>
              <button className="btn btn-dark w-100 mt-4 mb-0 hover-lift-sm hover-boxshadow">
                Add To Shopping Bag
              </button>

              <div className="my-5">
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="text-center px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 512 512"
                      >
                        <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" />
                      </svg>
                      <small className="d-block mt-1">Next-day Delivery</small>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="text-center px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 640 512"
                      >
                        <path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64H337.9c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64h64V320zM320 352c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96s43 96 96 96z" />
                      </svg>
                      <small className="d-block mt-1">Secure Checkout</small>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="text-center px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 512 512"
                      >
                        <path d="M224 445.3V323.5l-94.3 77.1c26.1 22.8 58.5 38.7 94.3 44.7zM89.2 351.1L224 240.8V66.7C133.2 81.9 64 160.9 64 256c0 34.6 9.2 67.1 25.2 95.1zm293.1 49.5L288 323.5V445.3c35.7-6 68.1-21.9 94.3-44.7zm40.6-49.5c16-28 25.2-60.5 25.2-95.1c0-95.1-69.2-174.1-160-189.3V240.8L422.8 351.1zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256z" />
                      </svg>
                      <small className="d-block mt-1">Free Returns</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="accordion" id="accordionProduct">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Product Details
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionProduct"
                  >
                    <div className="accordion-body">
                      <p className="m-0">
                        Made from 100% organic cotton, The Kiikii Osaka Japan T-Shirt was created
                        with everyday use in mind. It features printed graphics and heavyweight
                        fabric for maximum comfort and lifespan.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Details & Care
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionProduct"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex border-0 row g-0 px-0">
                          <span className="col-4 fw-bolder">Composition</span>
                          <span className="col-7 offset-1">98% Cotton, 2% elastane</span>
                        </li>
                        <li className="list-group-item d-flex border-0 row g-0 px-0">
                          <span className="col-4 fw-bolder">Care</span>
                          <span className="col-7 offset-1">
                            Professional dry clean only. Do not bleach. Do not iron.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Delivery & Returns
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionProduct"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex border-0 row g-0 px-0">
                          <span className="col-4 fw-bolder">Delivery</span>
                          <span className="col-7 offset-1">
                            Standard delivery free for orders over $99. Next day delivery $9.99
                          </span>
                        </li>
                        <li className="list-group-item d-flex border-0 row g-0 px-0">
                          <span className="col-4 fw-bolder">Returns</span>
                          <span className="col-7 offset-1">
                            30 day return period. See our{" "}
                            <a className="text-link-border" href="#">
                              terms & conditions.
                            </a>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- / Product Accordion--> */}
            </div>{" "}
          </div>
        </div>
        {/* <!-- / Product Information--> */}
      </div>
      {/* <!-- / Product Top Section--> */}
    </div>
  );
};
