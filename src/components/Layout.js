/** @format */

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <div className='body-container w-full flex-1'>
        <Outlet />
      </div>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Layout;
