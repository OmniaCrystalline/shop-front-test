/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { basket, isLoading, user } from "../redux/selectors";
import ProductItem from "./ProductItem";
import { useForm } from "react-hook-form";
import { addUserData } from "../redux/slice";
import { useEffect } from "react";
import { sendOrder } from "../redux/operations";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "./Loader";

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
  const onSubmit = (data) => {
    dispatch(addUserData(data));
    reset();
  };

  const sum = inBasket.reduce((acc, curr) => {
    return (acc += curr.price * curr.quantity);
  }, 0);

  useEffect(() => {
    if (madeOrder.order.length === 0) return;
    dispatch(sendOrder(madeOrder));
  }, [dispatch, madeOrder]);

  return (
    <div className='container grid md:grid-cols-2 md:h-screen m-auto'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col md:gap-4 bg-red-200 p-3 md:p-5 text-lg'>
        Name
        <input
          {...register("name", { required: true })}
          className='md:p-2 rounded'
        />
        {errors.name?.message}
        Email
        <input
          {...register("email", { required: true })}
          className='md:p-2 rounded'
        />
        {errors.email?.message}
        Phone
        <input
          {...register("phone", { required: true })}
          className='md:p-2 rounded'
        />
        {errors.phone?.message}
        Adress
        <input
          {...register("adress", { required: true })}
          className='md:p-2 rounded'
        />
        {errors.adress?.message}
        <input type='submit' className='md:p-2 bg-sky-200 rounded mt-5' />
      </form>

      <div className='container grid p-3 bg-green-200 h-screen md:text-xl md:h-auto md:gap-2 overflow-scroll'>
        {pending && <Loader />}
        {inBasket.length === 0 && <p>emply basket</p>}
        {inBasket.length > 0 &&
          inBasket.map((e) => <ProductItem key={e._id} e={e} />)}
        <p className='p-3 text-lg'>sum: {sum}$</p>
      </div>
    </div>
  );
};

export default Card;
