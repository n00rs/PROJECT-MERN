import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authSlice, { setUser } from "../../store/authSlice";
import LoginModal from "./LoginModal/LoginModal";
import styles from "./Header.module.css";
import img from "../../assets/logo.png";
import { LOGOUT_URL } from "../../Constant";

const Header = (onRouteChange) => {
  const [showModal, setShowModal] = useState(false);
  const { userExist } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(userExist, "==header");

  const loginHandler = () => setShowModal(true);

  const logoutHandler = async () => {
    try {
      const response = await fetch(LOGOUT_URL, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();

      console.log(data);
      if (data.logout) dispatch(setUser(""));
    } catch (error) {
      console.log(error);
    }
  };

  const loginComponent = (
    <button className={styles["join-button"]} onClick={loginHandler}>
      Login
    </button>
  );

  const logoutComponet = (
    <button className={styles["join-button"]} onClick={logoutHandler}>
      Logout
    </button>
  );
  return (
    <nav>
      <div className={styles.logo}>
        <Link>
          <img src={img} alt="Logo Image" className="rounded-circle" />
        </Link>
      </div>
      <div className={styles.hamburger} onClick="">
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>
      <ul className={styles["nav-links"]}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link href="#">Gallery</Link>
        </li>
        <li>
          <Link href="#">Latest News</Link>
        </li>
        <li>
          <Link href="#">Shop</Link>
        </li>
        <li>
          <Link href="#">Blog</Link>
        </li>
        <li>
          <Link className={styles["login-button"]} to="/chat">
            Chat Room
          </Link>
        </li>
        <li>{userExist ? logoutComponet : loginComponent}</li>
      </ul>
      <LoginModal showModal={showModal} onClose={setShowModal} />
    </nav>
  );
};

export default Header;
