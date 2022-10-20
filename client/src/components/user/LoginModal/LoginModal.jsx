import React, { useState } from "react";
import { memo } from "react";
// import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
// import styles from "./LoginModal.module.css";
// import { Link, useNavigate } from "react-router-dom";
// // import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { GOOGLE_CLIENT_ID } from "../../../Constant";
import Login from "../../../pages/Login";
import Signup from "../../../pages/Signup";

const LoginModal = ({ showModal, onClose }) => {
  const [toggle, setToggle] = useState("login");
  const closeHandler = () => {
    onClose(false);
    setToggle("login");
  };
  // const setTogle = (val)=>setToggle(val)
  console.log("Modal");
  return (
    <>
      <Modal
        // backdrop="static"
        centered={true}
        // scrollable={true}
        size="m"
        onHide={closeHandler}
        show={showModal}
        contentClassName="bg-black"
      >
        <Modal.Header closeButton className="bg-white">
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {toggle === "login" ? (
            <Login onToggle={setToggle} />
          ) : toggle === "signup" ? (
            <Signup onToggle={setToggle} />
          ) : (
           closeHandler()
          )}
        </Modal.Body>
      </Modal>
      {/* <Signup */}
    </>
  );
};

export default memo(LoginModal);
