import React, { useEffect, useState, useContext } from "react";
import { fetchAllFoods } from "../api/FoodApi";
import { CartContext } from "../context/CartContext";

// Import Khmer food JSON directly
import khmerFoodData from "../data/khmerFoods.json";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function getFoods() {
      try {
        setLoading(true);
        setError(null);

        // Fetch remote foods
        const remoteData = await fetchAllFoods();
        console.log("Remote data fetched:", remoteData);

        // Normalize remote data safely, default category 'European'
        const remoteDataWithCategory = Array.isArray(remoteData)
          ? remoteData.map((item) => ({
              ...item,
              category: item.category || "European",
              id:
                item.idMeal ||
                item.id ||
                Math.random().toString(36).substr(2, 9), // fallback ID
              name: item.strMeal || item.name || "Unknown Food",
              image: item.strMealThumb || item.image || "",
              price: item.price || 0, // default price if missing
            }))
          : [];

        console.log("Normalized remote data:", remoteDataWithCategory);

        // Combine remote and Khmer foods — comment this out to test remote data alone
        const combinedData = [...remoteDataWithCategory, ...khmerFoodData];

        console.log("Combined data count:", combinedData.length);

        setFoods(combinedData);
        setFilteredFoods(combinedData);
      } catch (err) {
        console.error("Error fetching food:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    getFoods();
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter(
        (food) =>
          food.category &&
          food.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredFoods(filtered);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🍲 Food Menu</h1>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-6">
        {["All", "Khmer", "European"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading/Error states */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* Food grid */}
      {!loading && !error && filteredFoods.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="border p-4 rounded shadow flex flex-col"
            >
              {food.image ? (
                <img
                  src={food.image}
                  alt={food.name}
                  className="h-32 w-full object-cover mb-2 rounded"
                />
              ) : (
                <div className="h-32 w-full bg-gray-300 mb-2 rounded flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <h2 className="text-lg font-semibold mb-1">{food.name}</h2>
              <p className="text-sm text-gray-700 mb-4">
                Price: {food.price ? `$${food.price.toFixed(2)}` : "N/A"}
              </p>
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
        !loading &&
        !error && <p>No food data available for selected category.</p>
      )}
    </div>
  );
}

export default Menu;
