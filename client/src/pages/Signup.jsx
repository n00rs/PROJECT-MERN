import { Col, Form, Row, Spinner, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

import GoogleAuth from "../components/UI/GoogleAuth";
import useValid from "../hooks/useValid";
import styles from "../components/user/LoginModal/LoginModal.module.css";
import { USER_SIGNUP_URL } from "../Constant";
import { toast } from "react-toastify";


const isNotEmpty = (val) => val.trim() !== "";
const isEmail = (val) => val.includes("@");
const isPass = (val) => val.trim().length === 7;

const Signup = ({ onToggle }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log("Signup");
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
  } = useValid(isPass);

  const {
    value: enteredConfirmPass,
    isError: confirmPassError,
    isValid: confirmPassValid,
    valueChangeHandler: confirmPassChangeHandler,
    blurHandler: confirmPassBlurHandler,
    reset: confirmPassReset,
  } = useValid((val) => val === enteredPass);
  // const { isLoading, error, sendReq } = useFetch();

  // console.log(fnameError);

  let formValid = false;
  if (fnameValid && lnameValid && emailValid && passValid && confirmPassValid)
    formValid = true;

  const toggleLogin = () => onToggle("login");

  const onSignup = async (e) => {
    e.preventDefault();
    if (formValid) {
      setIsLoading(true);
      const body = {
        firstName: enteredFname,
        lastName: enteredLname,
        email: enteredEmail,
        password: enteredPass,
      };

      try {
        var a = Date.now();
        const response = await fetch(USER_SIGNUP_URL, {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (!response.ok) throw data;
        console.log(data);
        toast(data.message);
        fnameReset();
        emailReset();
        lnameReset();
        passReset();
        confirmPassReset();
        setIsLoading(false);
        console.log(Date.now() - a);
        toggleLogin();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        console.log(Date.now() - a);

        toast.error(err.message);
      }
    }
  };

  if (isLoading) return <Spinner animation="border" size="M" />;
  return (
    <Form className="text-white" noValidate onSubmit={onSignup}>
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
            isInvalid={fnameError}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Name.
          </Form.Control.Feedback>
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
            isInvalid={lnameError}
          />

          <Form.Control.Feedback type="invalid">
            Please provide a valid Last Name.
          </Form.Control.Feedback>
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
          isInvalid={emailError}
        />

        <Form.Control.Feedback type="invalid">
          Please provide a valid Email.
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Form.Group as={Col} controlId="password">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={passChangeHandler}
            onBlur={passBlurHandler}
            value={enteredPass}
            isInvalid={passError}
            autoComplete="new-Password"
          />

          <Form.Control.Feedback type="invalid">
            Please enter a valid password more than 7 letters
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="confrmPassword">
          <Form.Label>confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter Password"
            name="confirmPassword"
            onChange={confirmPassChangeHandler}
            onBlur={confirmPassBlurHandler}
            value={enteredConfirmPass}
            isInvalid={confirmPassError}
          />
          <Form.Control.Feedback type="invalid">
            Password doesn't match
          </Form.Control.Feedback>
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
      {formValid && <button className={styles.loginBTN}>Signup</button>}
      <span className="or">OR</span>

      <GoogleAuth page="signup" navigate={toggleLogin}/>

      <span>
        alreadey signed up account ?
        <Link onClick={toggleLogin} className={styles.notreg}>
          Signup
        </Link>
      </span>
    </Form>
  );
};

export default Signup;
