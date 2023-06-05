/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className='bg-sky-400 h-20 w-screen flex align-middle text-2xl'>
        <nav className='container gap-4 flex m-auto p-5 '>
          <NavLink to='/'>shop</NavLink>
          <NavLink to='/card'>card</NavLink>
          <NavLink to='/history'>history</NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
