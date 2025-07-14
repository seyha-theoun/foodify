import React, { useEffect, useState } from "react";
import { fetchAllFoods } from "../api/FoodApi";
import FoodCard from "./KhmerFood";
function Home() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    async function getFoods() {
      const data = await fetchAllFoods();
      setFoods(data.slice(0, 4)); // Only take the first 4 meals
    }
    getFoods();
  }, []);

  return (
    <>
      <section className="relative bg-gradient-to-r from-orange-50 to-amber-50">
        {/* Hero Container */}
        <div className="container h-screen mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Discover the <span className="text-amber-600">Tastiest</span> Food
              Around You
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              From local favorites to international cuisine, Foodify brings the
              best dishes to your table. Order now or explore our curated
              recipes!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="../menu">
                {" "}
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
                  Order Now
                </button>
              </a>
              <button className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold py-3 px-6 rounded-lg transition duration-300">
                Explore Recipes
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Delicious food"
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg hidden md:block">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Special Offer</p>
                    <p className="text-sm text-gray-600">20% off first order</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <FoodCard /> 
        {/* Floating Food Icons */}
        <div className="hidden md:block absolute top-20 left-10 text-4xl opacity-20">
          🍕
        </div>
        <div className="hidden md:block absolute bottom-20 right-10 text-4xl opacity-20">
          🍣
        </div>
      </section>
      {/* Popular food  */}
\
    </>
  );
}

export default Home;
