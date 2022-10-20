import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { toast } from "react-toastify";
import {
  GOOGLE_CLIENT_ID,
  USER_LOGIN_URL,
  USER_SIGNUP_URL,
} from "../../Constant";

const GoogleAuth = ({ page, navigate }) => {
  let url;
  if (page === "signup") url = USER_SIGNUP_URL;
  if (page === "login") url = USER_LOGIN_URL;

  const onSuccess = async (data) => {
    console.log(data.credential, url);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${data.credential}` },
      });

      const resData = await response.json();
      if (!response.ok) throw resData;
      if(page === "signup") navigate();
      if(page === "login") navigate('/')
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin onSuccess={onSuccess}>
        <i className="fa-brands fa-google"></i>
        Sign in with google
      </GoogleLogin>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
