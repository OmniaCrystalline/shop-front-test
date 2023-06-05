/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import { changeQuantity, removeFromCard } from "../redux/slice";

export const ProductItem = ({ e }) => {
  const { _id, title, img, quantity, weight, price, seller } = e;
  const dispatch = useDispatch();
  return (
    <div className='grid gap-3 bg-slate-100'>
      <div key={_id} className='p-3 grid md:flex gap-3 shadow-lg'>
        <h3 className='text-2xl'>{e.title}</h3>
        <div className='container image-container md:w-1/4 md:align-middle'>
          <img
            src={`/images/${seller.toLowerCase() + "s"}/${img}.jpg`}
            placeholder={"https://placehold.co/150x150"}
            alt={title}
          />
        </div>
        <div className="container grid gap-1">
          <p>{weight}</p>
          <p>price: {price} $</p>
          <div className='flex justify-between'>
            <label>
              <span>Change quantity </span>
              <input
                type='number'
                placeholder={quantity}
                className='rounded p-1 '
                onChange={(e) =>
                  dispatch(changeQuantity([_id, e.target.value]))
                }></input>
            </label>
            <p>sum: {price * quantity} $</p>
            <button
              type='button'
              className='bg-slate-100 rounded p-2 w-fit'
              onClick={() => dispatch(removeFromCard(_id))}>
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
