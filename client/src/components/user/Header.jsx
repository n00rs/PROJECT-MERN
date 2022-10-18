import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import img from "../../assets/logo.png";
import { Modal, Row } from "react-bootstrap";
import { useEffect } from "react";
import LoginModal from "./LoginModal/LoginModal";
import { useState } from "react";
import Login from "../../pages/Login";

const Header = (onRouteChange) => {
  const [showModal, setShowModal] = useState(false);

  let hamClick;
  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");
    hamClick = () => {
      console.log("fg");
      //Animate Links
      navLinks.classList.toggle("open");

      links.forEach((link) => {
        link.classList.toggle("fade");
      });

      //Hamburger Animation
      hamburger.classList.toggle("toggle");
    };
  }, []);

  const loginHandler = () => {
    setShowModal(true);
  };

  return (
    <nav>
      <div className={styles.logo}>
        <Link>
          <img src={img} alt="Logo Image" className="rounded-circle" />
        </Link>
      </div>
      <div className={styles.hamburger} onClick={hamClick}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>
      <ul className={styles["nav-links"]}>
        <li>
          <Link href="#">Home</Link>
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
          <button className={styles["login-button"]} href="#">
            Chat Room
          </button>
        </li>
        <li>
          <button className={styles["join-button"]} onClick={loginHandler}>
            Login
          </button>
        </li>
      </ul>
        <LoginModal showModal={showModal} onClose={setShowModal} />
    </nav>
  );
};

export default Header;
