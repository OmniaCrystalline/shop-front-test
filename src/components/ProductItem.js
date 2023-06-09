/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import { changeQuantity, removeFromCard } from "../redux/slice";

export const ProductItem = ({ e }) => {
  const { _id, title, img, quantity, weight, price, seller } = e;
  console.log('e', e)
  const dispatch = useDispatch();
  return (
    <div className='grid gap-3 bg-slate-100'>
      <div key={_id} className='p-3 grid md:flex gap-3 shadow-lg'>
        <div className='container'>
          <h3 className='text-2xl'>{e.title}</h3>
          <div className='container image-container'>
            <img
              src={`/images/${seller.toLowerCase() + "s"}/${img}.jpg`}
              placeholder={"https://placehold.co/150x150"}
              alt={title}
            />
          </div>
        </div>
        <div className='container grid gap-1'>
          <div className='grid grid-col-3 gap-1'>
            <p>weight: {weight} gr</p>
            <p>price: {price} $</p>
            <label className="flex gap-1">
              <span>change quantity </span>
              <input
                type='number'
                placeholder={quantity}
                className='rounded p-1 w-24 flex'
                onChange={(e) =>
                  dispatch(changeQuantity([_id, e.target.value]))
                }></input>
            </label>
            <p>sum: {price * quantity} $</p>
            <button
              type='button'
              className='bg-slate-200 rounded px-3 w-fit flex'
              onClick={() => dispatch(removeFromCard(_id))}>
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
