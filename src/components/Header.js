/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 h-20 w-screen fixed top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-95'>
      <nav className='container gap-6 flex items-center justify-center md:justify-start m-auto h-full p-5 max-w-7xl'>
        <NavLink 
          to='/' 
          className='flex items-center gap-3 mr-4 hover:opacity-80 transition-opacity duration-300'
        >
          <img 
            src='/logo.png' 
            alt='Serene Brew логотип' 
            className='h-12 w-12 object-contain'
          />
          <span className='text-white font-bold text-xl md:text-2xl hidden sm:block'>
            Serene Brew
          </span>
        </NavLink>
        <NavLink 
          to='/' 
          className={({ isActive }) =>
            `relative px-4 py-2 text-white font-semibold text-lg transition-all duration-300 hover:scale-110 ${
              isActive ? 'text-yellow-300' : ''
            }`
          }>
          <span className='relative z-10'>Страви</span>
          <span className='absolute inset-0 bg-white opacity-0 hover:opacity-20 rounded-lg transition-opacity duration-300'></span>
        </NavLink>
        <NavLink 
          to='/card' 
          className={({ isActive }) =>
            `relative px-4 py-2 text-white font-semibold text-lg transition-all duration-300 hover:scale-110 ${
              isActive ? 'text-yellow-300' : ''
            }`
          }>
          <span className='relative z-10'>Кошик</span>
          <span className='absolute inset-0 bg-white opacity-0 hover:opacity-20 rounded-lg transition-opacity duration-300'></span>
        </NavLink>
        <NavLink 
          to='/history' 
          className={({ isActive }) =>
            `relative px-4 py-2 text-white font-semibold text-lg transition-all duration-300 hover:scale-110 ${
              isActive ? 'text-yellow-300' : ''
            }`
          }>
          <span className='relative z-10'>Історія</span>
          <span className='absolute inset-0 bg-white opacity-0 hover:opacity-20 rounded-lg transition-opacity duration-300'></span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
