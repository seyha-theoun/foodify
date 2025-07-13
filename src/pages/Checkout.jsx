import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cartItems } = useContext(CartContext);

  // Form state
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => {
    // Assuming item has a price property (adjust if different)
    return sum + (item.price || 0);
  }, 0);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customer.name || !customer.email || !customer.address) {
      alert("Please fill in all fields");
      return;
    }

    alert(
      `Thank you for your order, ${customer.name}! Total: $${totalPrice.toFixed(
        2
      )}`
    );

    // You can add real order processing here

    // Optionally clear form or cart
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-4">Your cart is empty. Please add some food first.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Cart Items */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="divide-y divide-gray-300">
          {cartItems.map((item, idx) => (
            <li key={idx} className="flex justify-between py-2">
              <span>{item.strMeal || item.title || "Item"}</span>
              <span>${item.price ? item.price.toFixed(2) : "0.00"}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-semibold text-lg mt-4">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Customer Info Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={customer.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={customer.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block font-medium mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
