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
    <div className='container flex flex-col md:grid md:grid-cols-6 m-auto pt-20'>
      <ul className='container gap-0 md:gap-4 flex justify-evenly md:flex-col md:h-screen md:justify-start p-2 md:bg-emerald-200 md:col-span-2 md:p-3'>
        {shops.map((e) => (
          <li key={e} className='bg-emerland-200 flex'>
            <button
              type='button'
              className={
                current === e
                  ? "w-full h-full px-2 md:p-5 bg-emerald-500 text-white rounded "
                  : "w-full h-full px-2 md:p-5 bg-emerald-300 rounded"
              }
              onClick={() => {
                dispatch(getOneTypeProduct(e));
                dispatch(shopChoice(e));
              }}>
              {e}
            </button>
          </li>
        ))}
      </ul>
      <div className='container md:col-span-4 p-3 overflow-scroll h-screen'>
        {loading && <Loader />}
        <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
          {data &&
            data.length > 0 &&
            data.map((e) => (
              <div key={e._id} className='p-3 grid shadow-lg'>
                <h3 className='text-2xl'>{e.title}</h3>
                <div className='container md:h-36 md:overflow-hidden'>
                  <img
                    src={`/images/${e.seller.toLowerCase() + "s"}/${e.img}.jpg`}
                    placeholder={"https://placehold.co/150x150"}
                    alt={e.title}
                  />
                </div>
                <p>{e.weight}</p>
                <p>{e.price} $</p>
                <p>recipe: {e.recipe}</p>
                <button
                  type='button'
                  className='bg-slate-100 rounded p-2 hover:bg-slate-200'
                  onClick={() => dispatch(addToCard(e))}>
                  add to card
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
