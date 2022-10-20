import React from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Header from "../user/Header";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "../../store/store";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default Layout;
