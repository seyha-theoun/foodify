import React, { useEffect, useState, useContext } from "react";
import { fetchAllFoods } from "../api/FoodApi";
import { CartContext } from "../context/CartContext";
import khmerFoodData from "../data/khmerFoods.json";
import AOS from "aos";
import "aos/dist/aos.css";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showAddToCartFeedback, setShowAddToCartFeedback] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    async function getFoods() {
      try {
        setLoading(true);
        setError(null);

        const remoteData = await fetchAllFoods();

        const remoteDataWithCategory = Array.isArray(remoteData)
          ? remoteData.map((item) => ({
              ...item,
              category: item.category || "European",
              id:
                item.idMeal ||
                item.id ||
                Math.random().toString(36).substr(2, 9),
              name: item.strMeal || item.name || "Unknown Food",
              image: item.strMealThumb || item.image || "",
              strInstructions: item.strInstructions || "",
              strYoutube: item.strYoutube || "",
              price: item.price || 0,
            }))
          : [];

        const combinedData = [...remoteDataWithCategory, ...khmerFoodData];

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

  const handleAddToCart = (food) => {
    addToCart(food);
    setAddedItemName(food.name);
    setShowAddToCartFeedback(true);

    // Hide the feedback after 2 seconds
    setTimeout(() => {
      setShowAddToCartFeedback(false);
    }, 500);
  };

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

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter((food) =>
        food.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredFoods(filtered);
    }
  };

  const displayedFoods = filteredFoods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 relative">
      {/* Add to Cart Feedback Overlay */}
      {showAddToCartFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
            <p className="text-xl font-semibold mb-2">✅ Added to Cart!</p>
            <p className="text-lg">{addedItemName}</p>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4" data-aos="fade-down">
        🍲 Food Menu
      </h1>
      <section className="mb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Filter buttons */}
          <div className="flex gap-2" data-aos="fade-up">
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
          {/* Search Bar */}
          <div className="flex items-center" data-aos="fade-up">
            <input
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>
      {/* Loading/Error */}
      {loading && <p data-aos="fade-in">Loading...</p>}
      {error && (
        <p className="text-red-600" data-aos="fade-in">
          Error: {error}
        </p>
      )}

      {/* Food Grid */}
      {!loading && !error && displayedFoods.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayedFoods.map((food, index) => (
            <div
              key={food.id}
              className="border p-4 rounded shadow flex flex-col"
              data-aos="zoom-in"
              data-aos-delay={index * 50}
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
              <p className="text-sm text-gray-700 mb-2">
                Price: {food.price ? `$${food.price.toFixed(2)}` : "N/A"}
              </p>
              <button
                onClick={() => handleAddToCart(food)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setSelectedRecipe(food)}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                View Recipe
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <p data-aos="fade-up">
            No food data available for selected category or search.
          </p>
        )
      )}

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-lg relative">
            <h2 className="text-2xl font-bold mb-4">{selectedRecipe.name}</h2>
            {selectedRecipe.image && (
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}
            <p className="mb-2">
              <strong>Category:</strong> {selectedRecipe.category || "Unknown"}
            </p>
            <p className="mb-2">
              <strong>Price:</strong> $
              {selectedRecipe.price ? selectedRecipe.price.toFixed(2) : "N/A"}
            </p>
            {selectedRecipe.strInstructions && (
              <p className="mb-2 whitespace-pre-line">
                <strong>Instructions:</strong> {selectedRecipe.strInstructions}
              </p>
            )}
            {selectedRecipe.strYoutube && (
              <a
                href={selectedRecipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-2"
              >
                📺 Watch on YouTube
              </a>
            )}
            <button
              onClick={() => setSelectedRecipe(null)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
