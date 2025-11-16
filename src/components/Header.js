/** @format */

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { basket } from "../redux/selectors";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inBasket = useSelector(basket);

  // Підраховуємо загальну кількість товарів (з урахуванням quantity)
  const totalItems = inBasket.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 h-20 w-screen fixed top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-95'>
      <nav className='container gap-6 flex items-center justify-between md:justify-start m-auto h-full p-5 max-w-7xl relative'>
        <NavLink
          to='/'
          className='flex items-center gap-3 hover:opacity-80 transition-opacity duration-300'
          onClick={closeMenu}>
          <img
            src='/logo.png'
            alt='Serene Brew логотип'
            className='h-12 w-12 object-contain'
          />
          <span className='text-white font-bold text-xl md:text-2xl hidden sm:block'>
            Serene Brew
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-6'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `relative px-4 py-2 text-white font-semibold text-lg transition-all duration-300 hover:scale-110 ${
                isActive ? "text-yellow-300" : ""
              }`
            }>
            <span className='relative z-10'>Страви</span>
            <span className='absolute inset-0 bg-white opacity-0 hover:opacity-20 rounded-lg transition-opacity duration-300'></span>
          </NavLink>
          <NavLink
            to='/card'
            className={({ isActive }) =>
              `relative px-4 py-2 text-white font-semibold text-lg transition-all duration-300 hover:scale-110 ${
                isActive ? "text-yellow-300" : ""
              }`
            }>
            <span className='relative z-10'>Кошик</span>
            {totalItems > 0 && (
              <span className='absolute -top-1 -right-1 bg-yellow-400 text-indigo-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse'>
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
            <span className='absolute inset-0 bg-white opacity-0 hover:opacity-20 rounded-lg transition-opacity duration-300'></span>
          </NavLink>
          <NavLink
            to='/history'
            className={({ isActive }) =>
              `relative px-4 py-2 text-white font-semibold text-lg transition-all duration-300 hover:scale-110 ${
                isActive ? "text-yellow-300" : ""
              }`
            }>
            <span className='relative z-10'>Історія</span>
            <span className='absolute inset-0 bg-white opacity-0 hover:opacity-20 rounded-lg transition-opacity duration-300'></span>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          type='button'
          onClick={toggleMenu}
          className='md:hidden text-white p-2 rounded-lg hover:bg-white/20 transition-colors duration-300'
          aria-label='Toggle menu'
          aria-expanded={isMenuOpen}>
          <svg
            className='w-6 h-6'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            {isMenuOpen ? (
              <path d='M6 18L18 6M6 6l12 12' />
            ) : (
              <path d='M4 6h16M4 12h16M4 18h16' />
            )}
          </svg>
        </button>

        {/* Mobile Navigation Menu */}
        <div
          className={`absolute top-20 left-0 right-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-xl transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}>
          <div className='container mx-auto px-5 py-4 space-y-3'>
            <NavLink
              to='/'
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-3 text-white font-semibold text-lg rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-yellow-300 text-indigo-900"
                    : "hover:bg-white/20"
                }`
              }>
              Страви
            </NavLink>
            <NavLink
              to='/card'
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-3 text-white font-semibold text-lg rounded-lg transition-all duration-300 relative ${
                  isActive
                    ? "bg-yellow-300 text-indigo-900"
                    : "hover:bg-white/20"
                }`
              }>
              <span>Кошик</span>
              {totalItems > 0 && (
                <span className='ml-2 bg-yellow-400 text-indigo-900 text-xs font-bold rounded-full px-2 py-1 shadow-lg'>
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </NavLink>
            <NavLink
              to='/history'
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-3 text-white font-semibold text-lg rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-yellow-300 text-indigo-900"
                    : "hover:bg-white/20"
                }`
              }>
              Історія
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
