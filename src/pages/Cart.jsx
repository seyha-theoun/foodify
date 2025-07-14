import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <div className="p-4">Your cart is empty.</div>;
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + (item.price || 0);
  }, 0);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul>
        {cartItems.map((item, index) => {
          const id = item.idMeal || item.id || item._id || "unknown";

          const name = item.strMeal || item.name || "Unknown Item";
          const image = item.strMealThumb || item.image || "";
          const price = item.price || 0;

          return (
            <li
              key={`${id}-${index}`} // <- Unique key using id + index
              className="flex items-center justify-between border-b py-2"
            >
              <div className="flex items-center gap-4">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-gray-600">${price.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
