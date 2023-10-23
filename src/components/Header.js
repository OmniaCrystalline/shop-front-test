/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className='bg-sky-300 h-20 w-screen fixed flex align-middle text-2xl'>
      <nav className='container gap-4 flex m-auto p-5 max-w-7xl'>
        <NavLink to='/'>shop</NavLink>
        <NavLink to='/card'>card</NavLink>
        <NavLink to='/history'>history</NavLink>
      </nav>
    </div>
  );
};

export default Header;
