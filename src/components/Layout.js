/** @format */

import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className='overflow-scroll'>
      <Header />
      <div className='body-container max-w-7xl m-auto'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
