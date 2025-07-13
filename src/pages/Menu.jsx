import React, { useEffect, useState, useContext } from "react";
import { fetchAllFoods } from "../api/FoodApi";
import { CartContext } from "../context/CartContext";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function getFoods() {
      try {
        const data = await fetchAllFoods();
        setFoods(data);
      } catch (err) {
        console.error("Error fetching food:", err);
      } finally {
        setLoading(false);
      }
    }

    getFoods();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🍲 Food Menu</h1>
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(foods) ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {foods.map((food) => (
            <div
              key={food.idMeal}
              className="border p-4 rounded shadow flex flex-col"
            >
              <img
                src={food.strMealThumb}
                alt={food.strMeal}
                className="h-32 w-full object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-semibold mb-2">{food.strMeal}</h2>
              <button
                onClick={() => addToCart(food)}
                className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No food data available</p>
      )}
    </div>
  );
}

export default Menu;
