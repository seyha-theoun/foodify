import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agree) newErrors.agree = "You must agree to Terms & Privacy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Add register logic (Firebase createUserWithEmailAndPassword)
      console.log("Signup submitted:", formData);

      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400";
  const fieldWrap = (hasError) =>
    `mt-2 flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 shadow-sm transition
     focus-within:ring-2 focus-within:ring-indigo-200
     ${hasError ? "border-red-300" : "border-gray-200"}`;

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* soft blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 text-xs font-bold">
            ✨ Create account
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
            Join Coffee Hub
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-gray-200 bg-white/75 backdrop-blur-xl shadow-xl p-6 md:p-8">
          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700"
              >
                Full name
              </label>
              <div className={fieldWrap(errors.name)}>
                <span className="text-gray-400">👤</span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputBase}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email address
              </label>
              <div className={fieldWrap(errors.email)}>
                <span className="text-gray-400">📧</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputBase}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className={fieldWrap(errors.password)}>
                <span className="text-gray-400">🔒</span>
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className={inputBase}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-800"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-gray-700"
              >
                Confirm password
              </label>
              <div className={fieldWrap(errors.confirmPassword)}>
                <span className="text-gray-400">✅</span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className={inputBase}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-800"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-semibold text-indigo-700 hover:underline"
                  >
                    Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-semibold text-indigo-700 hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              {errors.agree && (
                <p className="mt-2 text-sm text-red-600">{errors.agree}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl py-3 text-sm font-semibold text-white shadow-sm transition
                bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>

            <p className="text-center text-xs text-gray-500">
              By creating an account you agree to our policies.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
