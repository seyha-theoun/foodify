import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import emailjs from "@emailjs/browser";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", isSuccess: null });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  const sendPreorderEmail = (orderData) => {
    const serviceID = "service_u5jdbm4";
    const templateID = "template_9xwiglg";
    const publicKey = "WnNEAsyUU7iSZw4Ii";

    const itemsDescription = orderData.cartItems
      .map(
        (item) => `${item.name || "Item"} - $${(item.price || 0).toFixed(2)}`
      )
      .join(", ");

    const templateParams = {
      from_name: orderData.name,
      from_email: "noreply@yourdomain.com",
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      order_summary: itemsDescription,
      total_price: orderData.totalPrice.toFixed(2),
    };

    return emailjs.send(serviceID, templateID, templateParams, publicKey);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !customer.name ||
      !customer.phone ||
      !customer.address ||
      !customer.email
    ) {
      setStatus({ message: "Please fill in all fields.", isSuccess: false });
      return;
    }

    setIsLoading(true);
    setStatus({ message: "", isSuccess: null });

    const orderData = {
      ...customer,
      cartItems,
      totalPrice,
    };

    try {
      await sendPreorderEmail(orderData);
      setStatus({
        message: `Thank you, ${customer.name}! Your order has been sent.`,
        isSuccess: true,
      });

      // ✅ Show success alert
      alert(
        `🎉 Thank you, ${customer.name}! Your order was placed successfully.`
      );

      clearCart();
      setCustomer({ name: "", phone: "", address: "", email: "" });

      setTimeout(() => setStatus({ message: "", isSuccess: null }), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({
        message: "Failed to send order. Please try again later.",
        isSuccess: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-4 text-center text-gray-700">
        Your cart is empty. Please add items before checking out.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="divide-y divide-gray-300">
          {cartItems.map((item, idx) => (
            <li key={idx} className="flex justify-between py-2">
              <span>{item.name || "Item"}</span>
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
          <label htmlFor="phone" className="block font-medium mb-1">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={customer.phone}
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
            rows={3}
            value={customer.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Placing Order..." : "Place Order"}
        </button>
      </form>

      {status.message && (
        <div
          className={`mt-6 p-4 rounded ${
            status.isSuccess
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}

export default Checkout;
