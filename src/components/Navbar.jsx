import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import ImageLogo from "../assets/photo/logo-no-bg.png"; // Adjust the path as necessary
function Navbar() {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.length;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className=" font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <img src={ImageLogo} alt="LogoWebsite" className="h-18 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Contact
            </Link>

            {/* Cart with badge */}
            <Link
              to="/cart"
              className="relative flex items-center text-gray-700 hover:text-indigo-600 transition-colors font-medium group"
            >
              <div className="relative p-2 rounded-md group-hover:bg-indigo-50 transition-colors">
                <FiShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="ml-1">Cart</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Cart
              {itemCount > 0 && (
                <span className="ml-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
