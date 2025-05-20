// src/components/Cart.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart, clearCart } from "../actions/cartActions";

const Cart = () => {
  const cart = useSelector((state) => state.handleCart.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <p>{item.name} - Qty: {item.qty}</p>
          <button onClick={() => dispatch(addCart(item))}>Add</button>
          <button onClick={() => dispatch(delCart(item))}>Remove</button>
        </div>
      ))}
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
};

export default Cart;