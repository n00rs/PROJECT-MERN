import  { useState } from "react";
import { memo } from "react";
import { Modal } from "react-bootstrap";

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
    
    </>
  );
};

export default memo(LoginModal);
