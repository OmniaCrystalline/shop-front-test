/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white mt-auto'>
      <div className='container max-w-7xl mx-auto px-4 py-8 md:py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
          <div className='animate-fade-in-up'>
            <div className='flex items-center gap-3 mb-4'>
              <img 
                src='/logo.png' 
                alt='Логотип' 
                className='h-12 w-12 object-contain'
              />
              <h3 className='text-2xl font-bold'>Наш магазин</h3>
            </div>
            <p className='text-indigo-100 mb-4'>
              Смачна та якісна їжа з доставкою до вашого дому. 
              Ми пропонуємо найкращі страви з різних кухонь світу.
            </p>
            <div className='flex gap-4 mt-4'>
              <button 
                type='button'
                className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110'
                aria-label='Facebook'
              >
                <span className='text-xl'>📘</span>
              </button>
              <button 
                type='button'
                className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110'
                aria-label='Instagram'
              >
                <span className='text-xl'>📷</span>
              </button>
              <button 
                type='button'
                className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110'
                aria-label='Twitter'
              >
                <span className='text-xl'>🐦</span>
              </button>
            </div>
          </div>
          
          <div className='animate-fade-in-up' style={{ animationDelay: '0.2s' }}>
            <h3 className='text-2xl font-bold mb-4'>Навігація</h3>
            <nav className='flex flex-col gap-3'>
              <NavLink 
                to='/' 
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition-colors duration-300 ${
                    isActive ? 'text-yellow-300' : ''
                  }`
                }
              >
                Магазин
              </NavLink>
              <NavLink 
                to='/card' 
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition-colors duration-300 ${
                    isActive ? 'text-yellow-300' : ''
                  }`
                }
              >
                Кошик
              </NavLink>
              <NavLink 
                to='/history' 
                className={({ isActive }) =>
                  `hover:text-yellow-300 transition-colors duration-300 ${
                    isActive ? 'text-yellow-300' : ''
                  }`
                }
              >
                Історія замовлень
              </NavLink>
            </nav>
          </div>
          
          <div className='animate-fade-in-up' style={{ animationDelay: '0.4s' }}>
            <h3 className='text-2xl font-bold mb-4'>Контакти</h3>
            <div className='space-y-3 text-indigo-100'>
              <div className='flex items-center gap-3'>
                <span className='text-2xl'>📞</span>
                <span>+380 (XX) XXX-XX-XX</span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-2xl'>✉️</span>
                <span>info@shop.com</span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-2xl'>📍</span>
                <span>м. Київ, вул. Прикладна, 1</span>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-2xl'>🕐</span>
                <span>Пн-Нд: 09:00 - 22:00</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className='border-t border-white/20 mt-8 pt-6 text-center text-indigo-100'>
          <p className='text-sm'>
            © {new Date().getFullYear()} Всі права захищені. Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

