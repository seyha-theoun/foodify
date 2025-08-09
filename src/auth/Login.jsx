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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring"
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center space-x-2 mt-4">
          <span className="text-gray-500 text-sm">or continue with</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleSocialLogin(googleProvider)}
            className="bg-white border p-2 rounded-md shadow hover:bg-gray-100"
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
            className="bg-white border p-2 rounded-md shadow hover:bg-gray-100"
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
            className="bg-white border p-2 rounded-md shadow hover:bg-gray-100"
            title="Sign in with GitHub"
          >
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub"
              className="h-5 mx-auto"
            />
          </button>
        </div>

        <div className="text-center text-sm mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
