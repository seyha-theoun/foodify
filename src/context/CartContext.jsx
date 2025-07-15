import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(item) {
    setCartItems((prev) => [...prev, item]);
  }

  function removeFromCart(id) {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id && item.idMeal !== id)
    );
  }

  function clearCart() {
    setCartItems([]); // ✅ Clears the cart
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }} // ✅ Added here
    >
      {children}
    </CartContext.Provider>
  );
}
