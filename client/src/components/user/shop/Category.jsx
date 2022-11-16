import { useRef, useState, useEffect, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FilterIcon } from "../../../assets/icons/FilterIcon";
import { FETCH_PRODUCTS_URL } from "../../../Constant";
import { CategoryBanner } from "./CategoryBanner";
import { ProductCard } from "./ProductCard";
import { Spinner } from "react-bootstrap";
import styles from "./ProductPage.module.css";
import { FilterCanvas } from "./FilterCanvas";
import { fetchProduct, resetPageNo, resetProd, setPageNo } from "../../../store/shopSlice";

export const Category = () => {
  let { category } = useParams();

  // const [searchParam, setSearchParams] = useSearchParams();

  // const [products, setProducts] = useState([]);

  // const [pageNo, setPageNo] = useState(0);

  // const [totalsPage, setTotalPages] = useState(0);

  // const [isLoading, setIsLoading] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();
  const { pageNo, isLoading, products, totalPages, error } = useSelector((state) => state.shop);
  console.log(category);
  // let category = searchParam.get("category");

  category = category === "all" ? "" : category;
  const observer = useRef();

  const lastProdRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        console.log(entries);
        if (entries[0].isIntersecting && pageNo + 1 < totalPages) {
          dispatch(setPageNo());
        }
      });
      console.log(node);
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  // if (!category) {
  //   setSearchParams("category", "all");
  // }
  useEffect(() => {
    dispatch(resetProd());
  }, [category]);

  useEffect(() => {
    dispatch(fetchProduct(category));
    // setIsLoading(true);
    // fetch(FETCH_PRODUCTS_URL + "?page=" + pageNo + "&category=" + category)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setIsLoading(false);
    //     if (!data.data) throw data;
    //     else {
    //       setTotalPages(data?.metaData[0]?.totalPages);
    //       setProducts((prev) => [...prev, ...data.data]);
    //     }
    //   })
    //   .catch((e) => {
    //     setIsLoading(false);
    //     console.log(e);
    //     toast.error(e.message);
    //   });
    
  }, [pageNo, category]);
useEffect(()=>{
 return () => {
    dispatch(resetPageNo());
  };
},[])
  // const pageHandler = () => {
  //   console.log(pageNo, totalsPage);
  //   if () setPageNo((prev) => prev + 1);
  //   else toast.error("opps reached limit");
  // };

  // console.log(categ);
  if (error) toast(error);
  const prodContent = products?.map((prod, ind) => {
    if (ind + 1 === products.length)
      return <ProductCard product={prod} key={prod._id} ref={lastProdRef} />;
    else return <ProductCard product={prod} key={prod._id} />;
  });
  const toggleFilter = () => setShowFilter((prev) => !prev);
  return (
    <>
      <section className="mt-0 p-2">
        <CategoryBanner />
        <div className="container-fluid">
          <div className="d-flex justify-content-between items-center pt-5 pb-4 flex-column flex-lg-row">
            <div>
              <nav aria-label="breadcrumb">
                <ol className={styles["breadcrumb"]}>
                  <li className={styles["breadcrumb-item"]}>
                    <Link to="/shop">SHOP</Link>
                  </li>
                  <li className={styles["breadcrumb-item"]}>
                    <Link>Products</Link>
                  </li>

                  <li className={`${styles["breadcrumb-item"]} active`} aria-current="page">
                    {category}
                  </li>
                </ol>
              </nav>
              <h1 className="fw-bold fs-3 mb-2">New Releases (121)</h1>
              <p className="m-0 text-muted small">Showing 1 - 9 of 121</p>
            </div>
            <div className="d-flex justify-content-end align-items-center mt-4 mt-lg-0 flex-column flex-md-row">
              <button
                className="btn bg-light p-3 me-md-3 d-flex align-items-center fs-7 lh-1 w-100 mb-2 mb-md-0 w-md-auto"
                type="button"
                onClick={toggleFilter}
              >
                <FilterIcon />
                Filters
              </button>
              {/* <!-- / Filter Trigger--> */}

              {/* <!-- Sort Options--> */}
              <select className="form-select form-select-sm border-0 bg-light p-3 pe-5 lh-1 fs-7">
                <option>Sort By</option>
                <option defaultValue="1">Hi Low</option>
                <option defaultValue="2">Low Hi</option>
                <option defaultValue="3">Name</option>
              </select>
              {/* <!-- / Sort Options--> */}
            </div>
          </div>
        </div>
        <div className="row g-4">{prodContent}</div>
        <div className={`d-flex flex-column ${styles["f-w-44"]} mx-auto my-5 text-center`}>
          <small className="text-muted">Showing of 121 products</small>
          <div className={`${styles["progress"]} ${styles["f-h-1"]}  mt-3"`}>
            <div
              className={`${styles["progress-bar"]} bg-dark`}
              role="progressbar"
              style={{ width: "25%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <a
            // onClick={pageHandler}
            className="btn btn-outline-dark btn-sm mt-5 align-self-center py-3 px-4 border-2"
          >
            Load More
          </a>
        </div>
      </section>
      <FilterCanvas show={showFilter} close={toggleFilter} />
    </>
  );
};
