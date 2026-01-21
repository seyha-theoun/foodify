import React from "react";
import { Link } from "react-router-dom";

function FoodCard({ food }) {
  if (!food) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={food.image || "https://via.placeholder.com/400x300"}
          alt={food.name}
          className="w-full h-44 object-cover transform group-hover:scale-105 transition duration-500"
        />

        {/* Badge */}
        <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Popular
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {food.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {food.description ||
            "Delicious Cambodian dish made with fresh ingredients."}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-amber-600 font-bold text-lg">
            ${Number(food.price || 0).toFixed(2)}
          </span>

          <Link to="/menu">
            <button className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
