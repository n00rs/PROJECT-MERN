import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleAuth from "../components/UI/GoogleAuth";
import { ADMIN_LOGIN_URL, USER_LOGIN_URL } from "../Constant";
import styles from "../components/user/LoginModal/LoginModal.module.css";
import { useDispatch } from "react-redux";
import { setAdmin, setUser } from "../store/authSlice";
import { LoginContainer } from "../components/UI/LoginContainer";

const Login = ({ onToggle }) => {
  console.log("LOGIN");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const getValues = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleSignup = () => onToggle("signup");

  const config = {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-type": "application/json" },
    credentials: "include",
  };

  async function loginHandler() {
    try {
      console.log("inside user Login");
      if (!formData.email || !formData.password)
        toast("please provide login details");
      else {
        const res = await fetch(USER_LOGIN_URL, config);

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

  const adminLoginHandler = async () => {
    try {
      console.log(config, "inside adminLogin Han");
      const res = await fetch(ADMIN_LOGIN_URL, config);
      const data = await res.json();
      if (!res.ok) throw data;
      dispatch(setAdmin(data.adminId));
      navigate("/admin/dash");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  // console.log(formData);

  if (pathname === "/admin/login") {
    return (
      <LoginContainer
        header="Admin"
        onChange={getValues}
        loginHandler={adminLoginHandler}
      />
    );
  }

  return (
    <LoginContainer
      header="Login"
      loginHandler={loginHandler}
      onChange={getValues}
      user={{ navigate, toggleSignup }}
    />

    // <div className={styles.loginContainer}>
    //   <div>
    //     <h3>WELCOME BACK</h3>

    //     <div className={styles.inputContainer}>
    //       <label>EMAIL</label>
    //       <input
    //         type="email"
    //         placeholder="Enter your email"
    //         name="email"
    //         onChange={(e) => getValues(e)}
    //       />
    //     </div>

    //     <div className={styles.inputContainer}>
    //       <label>Password</label>
    //       <input
    //         type="Password"
    //         placeholder="ENTER your password"
    //         name="password"
    //         onChange={(e) => getValues(e)}
    //       />
    //     </div>

    //     <div className={styles.forgetContainer}>
    //       <div>
    //         Remeber me <input type="checkbox" />
    //       </div>
    //       <div>
    //         <Link to="/forget-password">Forget password ?</Link>
    //       </div>
    //     </div>

    //     <button className={styles.loginBTN} onClick={LoginHandler}>
    //       LOGIN
    //     </button>

    //     <span className="or">OR</span>

    //     <GoogleAuth page="login" navigate={navigate} />

    //     <span>
    //       Not registered yet ?
    //       <Link onClick={toggleSignup} className={styles.notreg}>
    //         Signup
    //       </Link>
    //     </span>
    //   </div>
    // </div>
  );
};

export default Login;
