/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import { changeQuantity, removeFromCard } from "../redux/slice";

export const ProductItem = ({ e }) => {
  const { _id, title, img, quantity, weight, price, seller, isPromoApplied, originalPrice } = e;
  const dispatch = useDispatch();
  return (
    <div 
      key={_id} 
      className={`p-4 grid md:flex gap-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border relative ${
        isPromoApplied 
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 border-2' 
          : 'bg-gradient-to-br from-gray-50 to-white border-gray-100'
      }`}
    >
      {isPromoApplied && (
        <div className='absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10'>
          🎁 БЕЗКОШТОВНО
        </div>
      )}
      <div className='w-full md:w-32 h-32 overflow-hidden rounded-xl'>
        <img
          src={`/images/${seller.toLowerCase() + "s"}/${img}.jpg`}
          placeholder={"https://placehold.co/150x150"}
          alt={title}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='flex-1 grid gap-2'>
        <div className='flex items-center gap-2'>
          <h3 className='text-xl font-bold text-gray-800'>{title}</h3>
          {isPromoApplied && (
            <span className='text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-bold'>
              АКЦІЯ
            </span>
          )}
        </div>
        <div className='grid gap-2 text-sm md:text-base'>
          <p className='text-gray-600'>
            <span className='font-semibold'>Вага:</span> {weight} г
          </p>
          <p className='text-gray-600'>
            <span className='font-semibold'>Ціна:</span> 
            {isPromoApplied && originalPrice ? (
              <span>
                <span className='line-through text-gray-400 mr-2'>{originalPrice} ₴</span>
                <span className='text-green-600 font-bold'>0 ₴ (БЕЗКОШТОВНО!)</span>
              </span>
            ) : (
              <span> {price} ₴</span>
            )}
          </p>
          <label className="flex items-center gap-2 flex-wrap">
            <span className='font-semibold text-gray-700'>Кількість:</span>
            <input
              type='number'
              min='1'
              defaultValue={quantity}
              className='rounded-lg p-2 w-20 border-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition-all duration-300'
              onChange={(e) =>
                dispatch(changeQuantity([_id, e.target.value]))
              }
            />
          </label>
          <p className='text-lg font-bold text-indigo-600'>
            Сума: {isPromoApplied ? (
              <span className='text-green-600'>0 ₴ <span className='text-sm text-gray-500'>(знижка {originalPrice * quantity}₴)</span></span>
            ) : (
              <span>{price * quantity} ₴</span>
            )}
          </p>
          <button
            type='button'
            className='bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 w-fit transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-semibold'
            onClick={() => dispatch(removeFromCard(_id))}>
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
