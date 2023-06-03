/** @format */

import React from "react";
import { useEffect, useState } from "react";
import { getAllProducts, getOneTypeProduct } from "../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, products } from "../redux/selectors";
import { addToCard } from "../redux/slice";

const shops = ["Pizza", "Sushi", "Vegan", "Burger"];

const Shop = () => {
  const [currentshop, setcurrentshop] = useState("all");
  const dispatch = useDispatch();
  const data = useSelector(products);
  const loading = useSelector(isLoading);
  console.log("currentshop", currentshop);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className='container grid grid-cols-6 m-auto p-3 '>
        <ul className='container gap-4 flex flex-col bg-emerald-200 col-span-2 p-3'>
          {shops.map((e) => (
            <li key={e} className=' bg-emerland-200 flex'>
              <button
                type='button'
                className={
                  currentshop === e
                    ? "w-full h-full p-5 bg-emerald-500 text-white"
                    : "w-full h-full p-5 bg-emerald-300"
                }
                onClick={() => {
                  dispatch(getOneTypeProduct(e));
                  setcurrentshop(e);
                }}>
                {e}
              </button>
            </li>
          ))}
        </ul>
        <div className='container col-span-4 h-screen p-3 overflow-scroll'>
          {loading && <div>loading...</div>}
          <div className='grid gap-3 grid-cols-2'>
            {data &&
              data.length > 0 &&
              data.map((e) => (
                <div key={e._id} className='p-3 grid shadow-lg'>
                  <h3 className='text-2xl'>{e.title}</h3>
                  <div className='container image-container'>
                    <img
                      src={`/images/${e.seller.toLowerCase() + "s"}/${
                        e.img
                      }.jpg`}
                      placeholder={"https://placehold.co/150x150"}
                      alt={e.title}
                    />
                  </div>

                  <p>{e.weight}</p>
                  <p>{e.price} $</p>
                  <button
                    type='button'
                    className='bg-slate-100 rounded p-2'
                    onClick={() => dispatch(addToCard(e))}>
                    add to card
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
