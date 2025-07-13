import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <div className="p-4">Your cart is empty.</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li
            key={item.idMeal}
            className="flex items-center justify-between border-b py-2"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.strMeal}</p>
                {/* If you have price, show it here */}
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.idMeal)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {/* You can add total price and checkout button here */}
    </div>
  );
}

export default Cart;
