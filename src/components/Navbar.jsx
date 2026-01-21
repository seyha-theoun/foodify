import React, { useContext, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import ImageLogo from "../assets/photo/logo-no-bg.png";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const itemCount = cartItems.length;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const isActive = (path) => {
    if (path === "/") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const navLinks = useMemo(
    () => [
      { label: "Home", path: "/" },
      { label: "Menu", path: "/menu" },
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" },
    ],
    [],
  );

  return (
    <nav className="sticky top-0 z-50">
      {/* Top glow line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* Glass bar */}
      <div className="border-b border-white/10 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/55">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative">
                <img
                  src={ImageLogo}
                  alt="LogoWebsite"
                  className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-indigo-500/15 to-purple-500/15 blur-xl opacity-0 group-hover:opacity-100 transition" />
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold tracking-wide text-gray-900">
                  COFFEE HUB
                </p>
                <p className="text-xs text-gray-500 -mt-0.5">
                  Fresh • Fast • Tasty
                </p>
              </div>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {/* Links */}
              <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white/60 px-2 py-1 shadow-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive(link.path)
                        ? "text-indigo-700"
                        : "text-gray-700 hover:text-indigo-700"
                    }`}
                  >
                    {isActive(link.path) && (
                      <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100" />
                    )}
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2">
                {/* User */}
                {user ? (
                  <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-2 shadow-sm">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {String(user?.email || "U")
                        .slice(0, 1)
                        .toUpperCase()}
                    </div>
                    <div className="hidden lg:block leading-tight">
                      <p className="text-xs text-gray-500">Signed in</p>
                      <p className="text-sm font-semibold text-gray-900 max-w-[170px] truncate">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={logout}
                      className="ml-1 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-red-200"
                      title="Logout"
                    >
                      <FiLogOut />
                      <span className="hidden lg:inline">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/login"
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isActive("/login")
                          ? "text-indigo-700 bg-indigo-50 border border-indigo-100"
                          : "text-gray-700 hover:text-indigo-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md bg-gradient-to-r from-indigo-600 to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    >
                      Sign up
                    </Link>
                  </div>
                )}

                {/* Cart */}
                <Link
                  to="/cart"
                  className={`relative inline-flex items-center justify-center rounded-full border px-3 py-2 transition shadow-sm ${
                    isActive("/cart")
                      ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 bg-white/70 text-gray-700 hover:bg-gray-50 hover:text-indigo-700"
                  }`}
                  title="Cart"
                >
                  <FiShoppingCart size={18} />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex items-center gap-2">
              <Link
                to="/cart"
                className={`relative inline-flex items-center justify-center rounded-full border px-3 py-2 transition ${
                  isActive("/cart")
                    ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 bg-white/70 text-gray-700 hover:bg-gray-50 hover:text-indigo-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiShoppingCart size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/70 px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
            <div className="mt-2 rounded-2xl border border-gray-200 bg-white/80 shadow-sm p-3">
              {/* User */}
              {user ? (
                <div className="flex items-center justify-between gap-3 px-2 py-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                      {String(user?.email || "U")
                        .slice(0, 1)
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Signed in</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 p-2">
                  <Link
                    to="/login"
                    className="text-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-700 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}

              <div className="my-2 h-px bg-gray-200" />

              {/* Links */}
              <div className="grid gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive(link.path)
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive(link.path) && (
                      <span className="text-xs font-bold text-indigo-700">
                        ACTIVE
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="mt-2">
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive("/cart")
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>Cart</span>
                  {itemCount > 0 ? (
                    <span className="min-w-[24px] h-6 px-2 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                      {itemCount}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500">Empty</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
