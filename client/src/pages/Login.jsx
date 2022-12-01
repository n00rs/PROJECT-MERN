import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ADMIN_LOGIN_URL, USER_LOGIN_URL } from "../api";
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

  const getValues = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
      if (!formData.email || !formData.password) toast("please provide login details");
      else {
        const res = await fetch(USER_LOGIN_URL, config);
        const data = await res.json();

        if (!res.ok) throw data;
        
        onToggle("");
        dispatch(setUser(data._id));
        toast(`welcome back ${data?.firstName}`);
      }
    } catch (err) {
      toast.error(err.message, "error");
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
    return <LoginContainer header="Admin" onChange={getValues} loginHandler={adminLoginHandler} />;
  }

  return (
    <LoginContainer
      header="Login"
      loginHandler={loginHandler}
      onChange={getValues}
      user={{ navigate, toggleSignup }}
    />
  );
};

export default Login;
