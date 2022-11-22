import { Link } from "react-router-dom";
import { Logo } from "../../../assets/icons/Logo";
import styles from "./CartStyles.module.css";

export const CartBreadcrumb = ({ handleNavlinks, activeLink }) => {
  const activeClass = `${styles["nav-link-checkout"]} ${styles.active}`;

  return (
    <>
      <a className="navbar-brand fw-bold fs-3 flex-shrink-0 mx-0 px-0" href="./index.html">
        <div className="d-flex align-items-center">
          <Logo />
        </div>
      </a>

      <nav className="d-none d-md-block">
        <ul className="list-unstyled d-flex justify-content-start mt-4 align-items-center fw-bolder small">
          <li className="me-4">
            <Link
              className={activeLink === "cart" ? activeClass : `${styles["nav-link-checkout"]} `}
              onClick={() => handleNavlinks("cart")}
            >
              Your Cart
            </Link>
          </li>

          <li className="me-4">
            <Link
              className={activeLink === "address" ? activeClass : `${styles["nav-link-checkout"]} `}
              onClick={() => handleNavlinks("address")}
            >
              Address
            </Link>
          </li>

          <li>
            <Link
              className={
                activeLink === "payment"
                  ? `${activeClass} ${styles["nav-link-last"]}`
                  : `${styles["nav-link-checkout"]} ${styles["nav-link-last"]}`
              }
              // className={`${styles["nav-link-checkout"]} `}
              onClick={() => handleNavlinks("payment")}
            >
              Payment
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
