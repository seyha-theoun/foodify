import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.length;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🍽️ Foodify
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/menu" className="hover:text-blue-500">
            Menu
          </Link>

          {/* Cart with badge */}
          <Link
            to="/cart"
            className="relative flex items-center hover:text-blue-500"
          >
            <FiShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span className="ml-1">Cart</span>
          </Link>

          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-500">
            Contact
          </Link>
        </div>

       
      </div>
    </nav>
  );
}

export default Navbar;
