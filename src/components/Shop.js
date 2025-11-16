/** @format */

import React from "react";
import { useEffect } from "react";
import { getAllProducts, getOneTypeProduct } from "../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import { currentShop, isLoading, products } from "../redux/selectors";
import { addToCard, shopChoice } from "../redux/slice";
import Loader from "./Loader";

const shops = ["Pizza", "Sushi", "Vegan", "Burger"];

const Shop = () => {
  const dispatch = useDispatch();
  const data = useSelector(products);
  const loading = useSelector(isLoading);
  const current = useSelector(currentShop);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div id="products" className='container flex flex-col md:grid md:grid-cols-6 m-auto pt-24 bg-gradient-to-br from-gray-50 to-gray-100 scroll-mt-20'>
      <aside className='container gap-2 md:gap-4 flex justify-evenly md:flex-col md:h-auto md:justify-start p-4 md:bg-gradient-to-b from-indigo-100 to-purple-100 md:col-span-2 md:p-6 md:rounded-r-2xl md:shadow-xl md:sticky md:top-20 md:self-start'>
        {shops.map((e, index) => (
          <li key={e} className='list-none w-full'>
            <button
              type='button'
              className={
                current === e
                  ? "w-full h-full px-4 py-4 md:p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold text-lg"
                  : "w-full h-full px-4 py-4 md:p-6 bg-white text-gray-700 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-indigo-50 font-semibold text-lg"
              }
              onClick={() => {
                dispatch(getOneTypeProduct(e));
                dispatch(shopChoice(e));
              }}
              style={{ animationDelay: `${index * 100}ms` }}
              >
              {e}
            </button>
          </li>
        ))}
      </aside>
      <div className='container md:col-span-4 p-4 md:p-6'>
        {loading && <Loader />}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {data &&
            data.length > 0 &&
            data.map((e, index) => (
              <div 
                key={e._id} 
                className='bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden'
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className='relative overflow-hidden rounded-xl mb-4 h-48'>
                  <img
                    src={`/images/${e.seller.toLowerCase() + "s"}/${e.img}.jpg`}
                    placeholder={"https://placehold.co/150x150"}
                    alt={e.title}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>
                <h3 className='text-xl font-bold text-gray-800 mb-2'>{e.title}</h3>
                <div className='space-y-2 mb-4'>
                  <p className='text-gray-600 flex items-center'>
                    <span className='font-semibold mr-2'>Вага:</span>
                    {e.weight} г
                  </p>
                  <p className='text-2xl font-bold text-indigo-600'>
                    {e.price} ₴
                  </p>
                  <p className='text-sm text-gray-500 italic line-clamp-2'>
                    {e.recipe}
                  </p>
                </div>
                <button
                  type='button'
                  className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-3 font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg'
                  onClick={() => dispatch(addToCard(e))}>
                  Додати до кошика
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
