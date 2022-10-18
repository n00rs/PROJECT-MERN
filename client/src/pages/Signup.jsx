import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useValid from "../hooks/useValid";
import GoogleAuth from "../components/UI/GoogleAuth";
import LoginModal from "../components/user/LoginModal/LoginModal";
import styles from "../components/user/LoginModal/LoginModal.module.css";

const isNotEmpty = (val) => val.trim() != "";
const isEmail = (val) => val.indcludes("@");
const isPass = (val) => val.trim().length === 7;
const Signup = ({ onToggle }) => {
  // const [formData, setFormData] = useState("");
  // const [errState, errDispatch] = useReducer(reducerFunc, initialState);

  const {
    value: enteredFname,
    isError: fnameError,
    isValid: fnameValid,
    valueChangeHandler: fnameChangeHandler,
    blurHandler: fnameBlurHandler,
    reset: fnameReset,
  } = useValid(isNotEmpty);

  const {
    value: enteredLname,
    isError: lnameError,
    isValid: lnameValid,
    valueChangeHandler: lnameChangeHandler,
    blurHandler: lnameBlurHandler,
    reset: lnameReset,
  } = useValid(isNotEmpty);

  const {
    value: enteredEmail,
    isError: emailError,
    isValid: emailValid,
    valueChangeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: emailReset,
  } = useValid(isEmail);

  const {
    value: enteredPass,
    isError: passError,
    isValid: passValid,
    valueChangeHandler: passChangeHandler,
    blurHandler: passBlurHandler,
    reset: passReset,
  } = useValid(isEmail);

  // const getValues = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  let formValid = false;
  if (fnameValid && lnameValid && emailValid,passValid) formValid = true;

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
            onChange={fnameChangeHandler}
            onBlur={fnameBlurHandler}
            value={enteredFname}
          />
          {fnameError && (
            <Form.Control.Feedback type="invalid">
              Please provide a valid Name.
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="lname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={lnameChangeHandler}
            onBlur={lnameBlurHandler}
            value={enteredLname}
          />
          {lnameError && (
            <Form.Control.Feedback type="invalid">
              Please provide a valid Last Name.
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Row>

      <Form.Group as={Col} controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailError && (
          <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Row>
        <Form.Group as={Col} controlId="password">
          <Form.Label>Password</Form.Label>
          
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={passChangeHandler}
            onBlur ={passBlurHandler}
            value={enteredPass}

          />

          {passError && (
            <Form.Control.Feedback type="invalid">
              Please enter a valid password more than 7 letters
            </Form.Control.Feedback>
          )}
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
