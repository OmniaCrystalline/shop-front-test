/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { basket, isLoading, user } from "../redux/selectors";
import ProductItem from "./ProductItem";
import { useForm } from "react-hook-form";
import { addUserData, applyPromotion } from "../redux/slice";
import {
  sendOrder,
  //addAll
} from "../redux/operations";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "./Loader";
//import { data } from "../redux/data";

const schema = yup
  .object({
    name: yup.string().required().min(2).max(20),
    email: yup.string().email().required(),
    phone: yup.number().required(),
    adress: yup.string().required().min(5),
  })
  .required();

const Card = () => {
  const dispatch = useDispatch();
  const madeOrder = useSelector(user);
  const inBasket = useSelector(basket);
  const pending = useSelector(isLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Показуємо всі товари з кошика, можна фільтрувати по категорії
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Групуємо товари по категоріях для відображення
  const groupedByCategory = inBasket.reduce((acc, item) => {
    if (!acc[item.seller]) {
      acc[item.seller] = [];
    }
    acc[item.seller].push(item);
    return acc;
  }, {});

  const categories = Object.keys(groupedByCategory);

  let list = [];
  
  if (selectedCategory === "all") {
    list = inBasket;
  } else {
    list = inBasket.filter((e) => e.seller === selectedCategory);
  }
  
  const onSubmit = (data) => {
    dispatch(addUserData(data));
    reset();
  };

  const sum = list.reduce((acc, curr) => {
    return (acc += curr.price * curr.quantity);
  }, 0);

  const totalSum = inBasket.reduce((acc, curr) => {
    return (acc += curr.price * curr.quantity);
  }, 0);

  // Перевіряємо, чи можна застосувати акцію (3+ товари, і ще не застосована)
  const canApplyPromotion = inBasket.length >= 3 && !inBasket.some(item => item.isPromoApplied);
  const hasPromotion = inBasket.some(item => item.isPromoApplied);
  const freeItem = inBasket.find(item => item.isPromoApplied);

  const handleApplyPromotion = () => {
    if (canApplyPromotion) {
      dispatch(applyPromotion());
    }
  };

  useEffect(() => {
    if (madeOrder && madeOrder?.order?.length === 0) return;
    dispatch(sendOrder(madeOrder));
  }, [dispatch, madeOrder]);


  return (
    <div className='container grid md:grid-cols-2 md:min-h-screen gap-4 pt-24 m-auto min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 bg-white p-6 md:p-8 rounded-2xl shadow-xl'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Дані для замовлення</h2>
        <div className='flex flex-col gap-2'>
          <label className='text-gray-700 font-semibold'>Ім'я</label>
          <input
            {...register("name", { required: true })}
            className='p-3 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition-all duration-300'
            placeholder="Введіть ваше ім'я"
          />
          {errors.name && (
            <span className='text-red-500 text-sm'>{errors.name?.message}</span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-gray-700 font-semibold'>Email</label>
          <input
            {...register("email", { required: true })}
            type='email'
            className='p-3 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition-all duration-300'
            placeholder="Введіть ваш email"
          />
          {errors.email && (
            <span className='text-red-500 text-sm'>{errors.email?.message}</span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-gray-700 font-semibold'>Телефон</label>
          <input
            {...register("phone", { required: true })}
            type='tel'
            className='p-3 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition-all duration-300'
            placeholder="Введіть ваш телефон"
          />
          {errors.phone && (
            <span className='text-red-500 text-sm'>{errors.phone?.message}</span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-gray-700 font-semibold'>Адреса</label>
          <input
            {...register("adress", { required: true })}
            className='p-3 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition-all duration-300'
            placeholder="Введіть адресу доставки"
          />
          {errors.adress && (
            <span className='text-red-500 text-sm'>{errors.adress?.message}</span>
          )}
        </div>
        <input 
          type='submit' 
          value="Оформити замовлення"
          className='p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold mt-4 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer' 
        />
      </form>

      <div className='container flex flex-col p-4 md:p-6 bg-white rounded-2xl shadow-xl gap-4 md:text-xl overflow-y-auto max-h-screen'>
        {pending && <Loader />}
        
        {inBasket.length > 0 ? (
          <>
            <div className='flex items-center justify-between mb-4 flex-wrap gap-4'>
              <h2 className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                Кошик
              </h2>
              {categories.length > 1 && (
                <div className='flex gap-2 flex-wrap'>
                  <button
                    type='button'
                    onClick={() => setSelectedCategory("all")}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      selectedCategory === "all"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Всі ({inBasket.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type='button'
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                        selectedCategory === cat
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {cat} ({groupedByCategory[cat].length})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedCategory !== "all" && (
              <div className='mb-4 p-3 bg-indigo-50 rounded-xl border border-indigo-200'>
                <p className='text-sm text-gray-600'>
                  Показано товари з категорії: <span className='font-bold text-indigo-600'>{selectedCategory}</span>
                </p>
              </div>
            )}

            {/* Блок акції */}
            {inBasket.length >= 3 && (
              <div className='mb-4 p-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-xl shadow-lg'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                  <div className='flex-1'>
                    <h3 className='text-xl font-bold text-white mb-1'>🔥 Акція 2+1=3</h3>
                    <p className='text-white text-sm'>
                      {hasPromotion 
                        ? `🎉 Акція застосована! Товар "${freeItem?.title}" безкоштовний!`
                        : canApplyPromotion
                          ? 'Купуй 2 страви і отримуй 3-ю безкоштовно!'
                          : 'Акція вже застосована'
                      }
                    </p>
                  </div>
                  {canApplyPromotion && (
                    <button
                      type='button'
                      onClick={handleApplyPromotion}
                      className='bg-white text-orange-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap'
                    >
                      Застосувати акцію
                    </button>
                  )}
                  {hasPromotion && (
                    <div className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg'>
                      <span className='text-white font-semibold'>✓ Активна</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className='space-y-4'>
              {list &&
                list.length > 0 &&
                list.map((e) => <ProductItem key={e._id} e={e} />)}
            </div>

            <div className='mt-6 space-y-3'>
              {selectedCategory !== "all" && list.length > 0 && (
                <div className='p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl'>
                  <p className='text-lg font-semibold text-center text-gray-700'>
                    Сума по категорії {selectedCategory}: {sum}₴
                  </p>
                </div>
              )}
              <div className='p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white'>
                <p className='text-2xl font-bold text-center'>
                  Загальна сума: {totalSum}₴
                </p>
                <p className='text-sm text-center text-indigo-100 mt-1'>
                  {inBasket.length} {inBasket.length === 1 ? 'товар' : inBasket.length < 5 ? 'товари' : 'товарів'} в кошику
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center py-12'>
            <p className='text-2xl text-gray-400 font-semibold mb-4'>Кошик порожній</p>
            <p className='text-gray-500'>Додайте товари з різних категорій до кошика</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
