import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; // import AuthContext here
import ImageLogo from "../assets/photo/logo-no-bg.png";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext); // get user and logout
  const itemCount = cartItems.length;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.includes(path);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100 backdrop-blur-sm bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <img
              src={ImageLogo}
              alt="LogoWebsite"
              className="h-16 w-auto transition-transform hover:scale-105"
            />
            <span className="ml-2 text-xl font-semibold hidden sm:block">
              COFFEE HUB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Menu", "About", "Contact"].map((label) => {
              const path =
                label.toLowerCase() === "home"
                  ? "/"
                  : `/${label.toLowerCase()}`;
              return (
                <Link
                  key={label}
                  to={path}
                  className={`text-gray-700 hover:text-indigo-600 transition-colors font-medium text-sm uppercase tracking-wider relative group ${
                    isActive(path) ? "text-indigo-600" : ""
                  }`}
                >
                  {label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all ${
                      isActive(path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}

            {/* User Info / Login & Signup */}
            <div className="flex items-center space-x-4 ml-4">
              {user ? (
                <>
                  <span className="text-gray-700 font-medium">
                    Hello, {user.email}
                  </span>
                  <button
                    onClick={logout}
                    className="text-red-500 font-medium hover:underline"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`text-gray-700 font-medium hover:text-indigo-600 transition-colors px-4 py-2 rounded-full hover:bg-gray-50 ${
                      isActive("/login") ? "text-indigo-600 bg-gray-50" : ""
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium px-6 py-2 rounded-full shadow hover:shadow-md hover:opacity-90 transition-all"
                  >
                    Sign up
                  </Link>
                </>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className={`relative flex items-center group p-2 ${
                  isActive("/cart")
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                <FiShoppingCart
                  size={20}
                  className="transition-transform hover:scale-110"
                />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              to="/cart"
              className={`relative p-2 ${
                isActive("/cart")
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              <FiShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-3 shadow-lg animate-fade-in">
          {["Home", "Menu", "About", "Contact"].map((label) => {
            const path =
              label.toLowerCase() === "home" ? "/" : `/${label.toLowerCase()}`;
            return (
              <Link
                key={label}
                to={path}
                className={`block px-4 py-3 rounded-lg text-base font-medium hover:text-indigo-600 hover:bg-gray-50 transition-colors ${
                  isActive(path)
                    ? "text-indigo-600 bg-gray-50"
                    : "text-gray-700"
                }`}
                onClick={toggleMobileMenu}
              >
                {label}
              </Link>
            );
          })}

          <div className="pt-2 space-y-3 border-t border-gray-100 mt-2">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
                className="block w-full text-center text-red-500 font-medium px-4 py-3 rounded-lg hover:bg-gray-50"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block w-full text-center font-medium transition-colors px-4 py-3 rounded-lg hover:bg-gray-50 ${
                    isActive("/login")
                      ? "text-indigo-600 bg-gray-50"
                      : "text-gray-700 hover:text-indigo-600"
                  }`}
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium px-6 py-3 rounded-lg shadow hover:opacity-90 transition-all"
                  onClick={toggleMobileMenu}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          <Link
            to="/cart"
            className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium hover:text-indigo-600 hover:bg-gray-50 transition-colors border-t border-gray-100 mt-2 ${
              isActive("/cart") ? "text-indigo-600 bg-gray-50" : "text-gray-700"
            }`}
            onClick={toggleMobileMenu}
          >
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="bg-indigo-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}
