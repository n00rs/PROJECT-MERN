import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useValid from "../../../server/hooks/useValid";
import GoogleAuth from "../components/UI/GoogleAuth";
import LoginModal from "../components/user/LoginModal/LoginModal";
import styles from "../components/user/LoginModal/LoginModal.module.css";


const Signup = ({ onToggle }) => {
  const [formData, setFormData] = useState("");
  // const [errState, errDispatch] = useReducer(reducerFunc, initialState);
  const {} = useValid()
 
  const getValues = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
 
 
  const toggleLogin = () => onToggle("login");

  const onSignup = (e) => {
    e.preventDefault();

    console.log(formData);
  };
  const googleLoginHandler = (data) => console.log(data);

  return (
    <Form className="text-white" onSubmit={onSignup}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="fname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={getValues}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="lname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={getValues}
          />
        </Form.Group>
      </Row>

      <Form.Group as={Col} controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={getValues}
        />
      </Form.Group>
      <Row>
        <Form.Group as={Col} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={getValues}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="confrmPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter Password"
            name="confirmPassword"
            onChange={getValues}
          />
        </Form.Group>
      </Row>

      <div className={styles.forgetContainer}>
        <div>
          Remeber me <input type="checkbox" />
        </div>
        <div>
          <Link to="/forget-password">Forget password ?</Link>
        </div>
      </div>
      <button className={styles.loginBTN}>LOGIN</button>
      <span className="or">OR</span>

      <GoogleAuth onSuccess={googleLoginHandler} />

      <span>
        alreadey signed up account ?
        <Link onClick={toggleLogin} className={styles.notreg}>
          Login
        </Link>
      </span>
    </Form>
  );
};

export default Signup;
