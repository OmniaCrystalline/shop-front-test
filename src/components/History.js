/** @format */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersOfUser, sendOrder } from "../redux/operations";
import { history } from "../redux/selectors";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";

const schemaEmail = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const schemaPhone = yup
  .object({
    phone: yup.number().required(),
  })
  .required();

const History = () => {
  const dispatch = useDispatch();
  const [type, settype] = useState("email");
  const resolver = type === "email" ? schemaEmail : schemaPhone;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resolver) });

  const onSubmit = (data) => {
    dispatch(getOrdersOfUser({ data }));
  };

  const data = useSelector(history);
  console.log('data history',typeof data !== "number")

  return (
    <div className='container pt-24 m-auto min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='container max-w-4xl m-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>
            Історія замовлень
          </h2>
          <div className='mb-6'>
            <label className='block text-gray-700 font-semibold mb-2'>
              Оберіть тип пошуку
            </label>
            <select
              className='w-full p-3 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition-all duration-300 bg-white'
              type='select'
              onChange={(e) => settype(e.target.value)}>
              <option value='email' className='w-full'>
                Email
              </option>
              <option value='phone' className='w-full'>
                Телефон
              </option>
            </select>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-gray-700 font-semibold'>
                {type === 'email' ? 'Email' : 'Телефон'}
              </label>
              <input
                {...register(`${type}`, { required: true })}
                type={type === 'email' ? 'email' : 'tel'}
                className='p-3 rounded-xl border-2 border-gray-300 focus:border-indigo-500 focus:outline-none transition-all duration-300'
                placeholder={type === 'email' ? 'Введіть ваш email' : 'Введіть ваш телефон'}
              />
              {(errors.email?.message || errors.phone?.message) && (
                <span className='text-red-500 text-sm'>
                  {errors.email?.message || errors.phone?.message}
                </span>
              )}
            </div>
            <input 
              type='submit' 
              value="Знайти замовлення"
              className='p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer' 
            />
          </form>
        </div>
        <div className='container'>
          <h3 className='text-center text-2xl font-bold text-gray-800 mb-6'>
            Ваші замовлення
          </h3>
          <div className='container grid gap-4'>
            { typeof data !== "number" && data && data.length > 0 && (
              <div className='container bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl shadow-lg grid grid-cols-5 gap-2 font-semibold'>
                <span>Дата</span>
                <span>№</span>
                <span>Назва</span>
                <span>Кількість</span>
                <span>Ціна</span>
              </div>
            )}
            {typeof data !== "number" && data?.map((data, index) => (
              <div
                key={index}
                className='container bg-white rounded-xl shadow-lg p-4 md:p-6 gap-4 border border-gray-100 hover:shadow-xl transition-all duration-300'>
                <div className='mb-4 pb-4 border-b border-gray-200'>
                  <p className='text-lg font-bold text-indigo-600'>
                    {moment(data.date).format("D-MM-YYYY")}
                  </p>
                </div>
                <div className='container grid gap-3 mb-4'>
                  {typeof data !== "number" && data?.order.map(({ title, quantity, price }, orderIndex) => (
                    <div key={orderIndex} className='container flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                      <span className='font-semibold text-indigo-600'>{orderIndex + 1}</span>
                      <span className='flex-1 text-left ml-4 font-medium'>{title}</span>
                      <span className='text-gray-600'>{quantity} шт.</span>
                      <span className='font-bold text-indigo-600'>{price}₴</span>
                    </div>
                  ))}
                </div>
                <button 
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg" 
                  type='button' 
                  onClick={() => dispatch(sendOrder(data))}>
                  Повторити замовлення
                </button>
              </div>
            ))}
            {typeof data === "number" && data === 0 && (
              <div className='text-center py-12 bg-white rounded-xl shadow-lg'>
                <p className='text-xl text-gray-400 font-semibold'>Замовлень не знайдено</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
