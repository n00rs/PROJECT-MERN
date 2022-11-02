import React from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Header from "../user/Header";


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
