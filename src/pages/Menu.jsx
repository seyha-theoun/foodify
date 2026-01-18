import React, { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { fetchAllFoods } from "../api/FoodApi";
import { CartContext } from "../context/CartContext";
import khmerFoodData from "../data/khmerFoods.json";

function Menu() {
  const { addToCart } = useContext(CartContext);

  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showAddToCartFeedback, setShowAddToCartFeedback] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");

  /* ---------------- AOS ---------------- */
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    async function loadFoods() {
      try {
        setLoading(true);
        setError(null);

        const remoteData = await fetchAllFoods();

        const normalizedRemote = Array.isArray(remoteData)
          ? remoteData.map((item) => ({
              id:
                item.idMeal ||
                item.id ||
                Math.random().toString(36).substring(2, 9),
              name: item.strMeal || item.name || "Unknown Food",
              image: item.strMealThumb || item.image || "",
              category: item.category || "ICED COFFEE",
              strInstructions: item.strInstructions || "",
              strYoutube: item.strYoutube || "",
              price: item.price || 0,
            }))
          : [];

        const combined = [...normalizedRemote, ...khmerFoodData];

        setFoods(combined);
        setFilteredFoods(combined);
      } catch (err) {
        setError(err.message || "Failed to load food data.");
      } finally {
        setLoading(false);
      }
    }

    loadFoods();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleFilter = (category) => {
    setSelectedCategory(category);
    setFilteredFoods(
      category === "All"
        ? foods
        : foods.filter(
            (food) => food.category?.toLowerCase() === category.toLowerCase(),
          ),
    );
  };

  const handleAddToCart = (food) => {
    addToCart(food);
    setAddedItemName(food.name);
    setShowAddToCartFeedback(true);
    setTimeout(() => setShowAddToCartFeedback(false), 600);
  };

  const displayedFoods = filteredFoods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  /* ---------------- RENDER ---------------- */
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto relative">
      {/* ADD TO CART FEEDBACK */}
      {showAddToCartFeedback && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 text-center shadow-xl animate-scale-in">
            <p className="text-xl font-bold mb-2">✅ Added to Cart</p>
            <p className="text-gray-700">{addedItemName}</p>
          </div>
        </div>
      )}

      {/* TITLE */}
      <h1 className="text-3xl font-extrabold mb-6" data-aos="fade-down">
        ☕ COFFEE MENU
      </h1>

      {/* FILTER & SEARCH */}
      <section className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-2" data-aos="fade-up">
            {["All", "HOT COFFEE", "ICED COFFEE"].map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition
                  ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="🔍 Search coffee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-full w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-aos="fade-up"
          />
        </div>
      </section>

      {/* STATES */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* FOOD GRID */}
      {!loading && !error && displayedFoods.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayedFoods.map((food, index) => (
            <div
              key={food.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              data-aos="zoom-in"
              data-aos-delay={index * 50}
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                {food.image ? (
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                {/* CATEGORY BADGE */}
                <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                  {food.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                  {food.name}
                </h2>

                <p className="text-sm text-gray-500 mb-3">
                  Premium coffee taste ☕
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-extrabold text-blue-600">
                    {food.price ? `$${food.price.toFixed(2)}` : "N/A"}
                  </span>

                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Available
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(food)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition mb-2"
                >
                  🛒 Add to Cart
                </button>

                <button
                  onClick={() => setSelectedRecipe(food)}
                  className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-2 rounded-xl transition"
                >
                  📖 View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-gray-600">
            No food found for selected category or search.
          </p>
        )
      )}

      {/* RECIPE MODAL */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <h2 className="text-2xl font-bold mb-4">{selectedRecipe.name}</h2>

            {selectedRecipe.image && (
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}

            <p className="mb-2">
              <strong>Category:</strong> {selectedRecipe.category}
            </p>

            <p className="mb-3">
              <strong>Price:</strong>{" "}
              {selectedRecipe.price
                ? `$${selectedRecipe.price.toFixed(2)}`
                : "N/A"}
            </p>

            {selectedRecipe.strInstructions && (
              <p className="text-sm text-gray-700 whitespace-pre-line">
                <strong>Instructions:</strong> {selectedRecipe.strInstructions}
              </p>
            )}

            {selectedRecipe.strYoutube && (
              <a
                href={selectedRecipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-3"
              >
                📺 Watch on YouTube
              </a>
            )}

            <button
              onClick={() => setSelectedRecipe(null)}
              className="mt-5 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition w-full"
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
