/** @format */

import React, { useState, useEffect } from "react";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Перевіряємо, чи користувач вже прийняв cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Показуємо банер через невелику затримку для кращого UX
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up'>
      <div className='container max-w-4xl mx-auto'>
        <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-white/20 backdrop-blur-sm relative'>
          <button
            onClick={declineCookies}
            className='absolute top-4 right-4 text-white hover:text-yellow-300 transition-colors duration-300 z-10'
            aria-label='Закрити'
          >
              <svg
                className='w-6 h-6'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path d='M6 18L18 6M6 6l12 12' />
              </svg>
          </button>
          <div className='flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6'>
            <div className='flex-shrink-0'>
              <div className='text-5xl animate-bounce'>🍪</div>
            </div>
            <div className='flex-1 text-white pr-8'>
              <h3 className='text-xl md:text-2xl font-bold mb-2'>
                Ми використовуємо cookies! 🍪
              </h3>
              <p className='text-sm md:text-base text-indigo-100 mb-4'>
                Цей сайт використовує cookies для покращення вашого досвіду. 
                Продовжуючи використовувати сайт, ви погоджуєтесь з нашою політикою використання cookies.
              </p>
              <div className='flex flex-col sm:flex-row gap-3'>
                <button
                  onClick={acceptCookies}
                  className='px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
                >
                  Прийняти всі 🎉
                </button>
                <button
                  onClick={declineCookies}
                  className='px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border-2 border-white/30'
                >
                  Відхилити
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
