import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
} from "../fireBase/firebase-config";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* soft blobs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Top mini header */}
        <div className="mb-6 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 text-xs font-bold">
            🔐 Welcome back
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
            Sign in to Coffee Hub
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your account and continue ordering.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-gray-200 bg-white/75 backdrop-blur-xl shadow-xl p-6 md:p-8">
          {/* Error */}
          {error && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email address
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-200">
                <span className="text-gray-400">📧</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-200">
                <span className="text-gray-400">🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-800"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Keep your account secure.
                </p>
                <button
                  type="button"
                  className="text-xs font-semibold text-indigo-700 hover:underline"
                  onClick={() =>
                    alert("Create a Forgot Password page later 🙂")
                  }
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl py-3 text-sm font-semibold text-white shadow-sm transition
                bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-semibold text-gray-500">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleSocialLogin(googleProvider)}
              disabled={loading}
              className="rounded-2xl border border-gray-200 bg-white px-3 py-3 shadow-sm hover:bg-gray-50 transition disabled:opacity-60"
              title="Sign in with Google"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                alt="Google"
                className="h-5 mx-auto"
              />
            </button>

            <button
              onClick={() => handleSocialLogin(facebookProvider)}
              disabled={loading}
              className="rounded-2xl border border-gray-200 bg-white px-3 py-3 shadow-sm hover:bg-gray-50 transition disabled:opacity-60"
              title="Sign in with Facebook"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="Facebook"
                className="h-5 mx-auto"
              />
            </button>

            <button
              onClick={() => handleSocialLogin(githubProvider)}
              disabled={loading}
              className="rounded-2xl border border-gray-200 bg-white px-3 py-3 shadow-sm hover:bg-gray-50 transition disabled:opacity-60"
              title="Sign in with GitHub"
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub"
                className="h-5 mx-auto"
              />
            </button>
          </div>

          {/* Bottom */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* tiny footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          By signing in, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
