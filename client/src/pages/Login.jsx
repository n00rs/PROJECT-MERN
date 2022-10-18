import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GoogleAuth from "../components/UI/GoogleAuth";
import LoginModal from "../components/user/LoginModal/LoginModal";
import styles from "../components/user/LoginModal/LoginModal.module.css";

const Login = ({ onToggle }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();

  const getValues = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleSignup = () => onToggle("signup");

  async function LoginHandler() {
    try {
      if (!formData.email || !formData.password)
        alert("please provide login details");
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      alert(data);

    } catch (err) {
      console.log(err);
      alert(err, "error");
    }
  }


  const googleLoginHandler = (googleData) => {
    console.log(googleData);
  };

  return (
    <div className={styles.loginContainer}>
      <div>
        <h3>WELCOME BACK</h3>

        <div className={styles.inputContainer}>
          <label>EMAIL</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={(e) => getValues(e)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label>Password</label>
          <input
            type="Password"
            placeholder="ENTER your password"
            name="password"
            onChange={(e) => getValues(e)}
          />
        </div>
        <div className={styles.forgetContainer}>
          <div>
            Remeber me <input type="checkbox" />
          </div>
          <div>
            <Link to="/forget-password">Forget password ?</Link>
          </div>
        </div>
        <button className={styles.loginBTN} onClick={LoginHandler}>
          LOGIN
        </button>
        <span className="or">OR</span>

        <GoogleAuth onSuccess={googleLoginHandler} />

        <span>
          Not registered yet ?
          <Link onClick={toggleSignup} className={styles.notreg}>
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
