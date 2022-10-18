
import React from "react";
import { Outlet } from "react-router-dom";
import { GOOGLE_CLIENT_ID } from "../../Constant";
import Header from "../user/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
