import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(item) {
    // Optional: check if item already exists and increase quantity instead
    setCartItems((prev) => [...prev, item]);
  }

  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item.idMeal !== id));
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
