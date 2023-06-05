/** @format */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersOfUser } from "../redux/operations";
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

  return (
    <div className='container m-auto md:p-5'>
      <select
        className='md:p-2 rounded'
        type='select'
        onChange={(e) => settype(e.target.value)}>
        <option value='email'>email</option>
        <option value='phone'>phone</option>
      </select>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col md:gap-4 bg-red-200 p-3 md:p-5 text-lg '>
        <input
          {...register(`${type}`, { required: true })}
          className='md:p-2 rounded'
        />
        {errors.email?.message || errors.phone?.message}
        <input type='submit' className='md:p-2 bg-sky-200 rounded mt-5' />
      </form>
      <div className='container'>
        <h3 className=' text-center text-rose-400 text-xl p-3'>Your orders</h3>
        <div className='container grid gap-3'>
          {data && data.length>0 && (
            <div className='container bg-fuchsia-300 p-3 flex justify-between'>
              <span>date</span>
              <span>#</span>
              <span>title</span>
              <span>quantity</span>
              <span>price</span>
            </div>
          )}
          {data?.map(({ date, order }, index) => (
            <div
              key={index}
              className='container grid grid-cols-4  bg-fuchsia-200 p-3'>
              <p className=' col-span-1'>{moment(date).format("D-MM-YYYY")}</p>
              <div className='container grid col-span-3 gap-3'>
                {order.map(({ title, quantity, price }, index) => (
                  <div key={index} className='container flex justify-between'>
                    <span>{index + 1}</span>
                    <span>{title}</span>
                    <span>{quantity}</span>
                    <span>{price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
