/** @format */

import React, { useState, useEffect } from "react";
import Shop from "../components/Shop";

const ShopPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full relative">
      <section className="hero-section bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-16 md:py-24 px-4">
        <div className="container max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            Ласкаво просимо до нашого магазину
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Смачна їжа з доставкою до вашого дому
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-2">🍕 Піца</h3>
              <p className="text-sm md:text-base">Свіжа та смачна</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-2">🍣 Суші</h3>
              <p className="text-sm md:text-base">Японська кухня</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-2">🥗 Веган</h3>
              <p className="text-sm md:text-base">Здорова їжа</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-2">🍔 Бургери</h3>
              <p className="text-sm md:text-base">Соковиті та насичені</p>
            </div>
          </div>
          <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={scrollToProducts}
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-indigo-50"
            >
              Переглянути страви ↓
            </button>
          </div>
        </div>
      </section>
      <section className="features-section bg-white py-12 md:py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Чому обирають нас?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Швидка доставка</h3>
              <p className="text-gray-600">Доставляємо замовлення протягом 30-60 хвилин</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Якісні продукти</h3>
              <p className="text-gray-600">Використовуємо тільки свіжі та якісні інгредієнти</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-indigo-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Доступні ціни</h3>
              <p className="text-gray-600">Чесні ціни без прихованих платежів</p>
            </div>
          </div>
        </div>
      </section>
      <section className="promotion-section bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 py-12 md:py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left animate-fade-in-up">
                <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
                  🔥 СПЕЦІАЛЬНА ПРОПОЗИЦІЯ
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Акція <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">2+1=3</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-700 mb-6">
                  Купуй <span className="font-bold text-orange-600">2 страви</span> і отримуй <span className="font-bold text-red-600">3-ю безкоштовно!</span>
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Дійсна на всі категорії: Піца, Суші, Веган та Бургери
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <button
                    onClick={scrollToProducts}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    Перейти до магазину ↓
                  </button>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="relative">
                  <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transform rotate-[-5deg]">
                    2+1=3
                  </div>
                  <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🎁</div>
                  <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎉</div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <div className="text-3xl mb-2">⏰</div>
                  <p className="font-semibold text-gray-800">Обмежена пропозиція</p>
                  <p className="text-sm text-gray-600">До кінця місяця</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-semibold text-gray-800">На всі категорії</p>
                  <p className="text-sm text-gray-600">Без обмежень</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl">
                  <div className="text-3xl mb-2">💯</div>
                  <p className="font-semibold text-gray-800">Автоматично</p>
                  <p className="text-sm text-gray-600">При додаванні до кошика</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Shop />
      
      {/* Кнопка повернення на початок */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          aria-label="Повернутися на початок"
        >
          <span className="text-2xl transform group-hover:-translate-y-1 transition-transform duration-300">↑</span>
        </button>
      )}
    </div>
  );
};

export default ShopPage;
