import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleAuth from "../components/UI/GoogleAuth";
import { USER_LOGIN_URL } from "../Constant";
import styles from "../components/user/LoginModal/LoginModal.module.css";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

const Login = ({ onToggle }) => {
  console.log("LOGIN");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const getValues = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleSignup = () => onToggle("signup");

  async function LoginHandler() {
    try {
      if (!formData.email || !formData.password)
        toast("please provide login details");
      else {
        const res = await fetch(USER_LOGIN_URL, {
          method: "POST",

          body: JSON.stringify(formData),
          headers: { "Content-type": "application/json" },
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw data;
        console.log(data, "data");
        onToggle("");
        dispatch(setUser(data._id));
        toast(document.cookie);
      }
    } catch (err) {
      console.log(err, "er.......");
      toast.error(err, "error");
    }
  }

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

        <GoogleAuth page="login" navigate={navigate} />

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
