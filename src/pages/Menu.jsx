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
  <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
    {/* ADD TO CART TOAST */}
    {showAddToCartFeedback && (
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[60]">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-xl px-4 py-3 shadow-xl animate-scale-in">
          <span className="text-xl">✅</span>
          <div className="leading-tight">
            <p className="font-bold text-gray-900">Added to cart</p>
            <p className="text-sm text-gray-600">{addedItemName}</p>
          </div>
        </div>
      </div>
    )}

    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
      {/* HEADER */}
      <div
        className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/70 backdrop-blur-xl shadow-sm p-6 md:p-10"
        data-aos="fade-down"
      >
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 text-xs font-bold">
              ☕ COFFEE HUB • MENU
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Discover your next{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                favorite coffee
              </span>
            </h1>
            <p className="mt-2 text-gray-600 max-w-xl">
              Hot, iced, and premium blends — filter fast and add to cart in one
              click.
            </p>
          </div>

          {/* SEARCH */}
          <div className="w-full md:w-[360px]" data-aos="fade-up">
            <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-200">
              <span className="text-gray-400">🔎</span>
              <input
                type="text"
                placeholder="Search coffee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-800"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="relative mt-6 flex flex-wrap gap-2" data-aos="fade-up">
          {["All", "HOT COFFEE", "ICED COFFEE"].map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition
                  ${
                    active
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* STATES */}
      {loading && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="h-40 rounded-2xl bg-gray-100 animate-pulse" />
              <div className="mt-4 h-4 w-3/4 rounded bg-gray-100 animate-pulse" />
              <div className="mt-2 h-3 w-1/2 rounded bg-gray-100 animate-pulse" />
              <div className="mt-4 h-10 rounded-2xl bg-gray-100 animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* GRID */}
      {!loading && !error && (
        <>
          {displayedFoods.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {displayedFoods.map((food, index) => (
                <div
                  key={food.id}
                  className="group rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
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
                      <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}

                    {/* badge */}
                    <span className="absolute top-3 left-3 rounded-full bg-black/60 text-white text-[11px] px-3 py-1 backdrop-blur">
                      {food.category}
                    </span>

                    {/* subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 flex flex-col">
                    <h2 className="text-[15px] md:text-base font-extrabold text-gray-900 line-clamp-1">
                      {food.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-500">
                      Premium coffee taste ☕
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-extrabold text-indigo-700">
                        {food.price ? `$${food.price.toFixed(2)}` : "N/A"}
                      </span>

                      <span className="text-[11px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 font-bold">
                        Available
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2">
                      <button
                        onClick={() => handleAddToCart(food)}
                        className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 text-sm font-semibold shadow-sm hover:opacity-95 transition"
                      >
                        🛒 Add to Cart
                      </button>

                      <button
                        onClick={() => setSelectedRecipe(food)}
                        className="rounded-2xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                      >
                        📖 View Recipe
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 text-center">
              <p className="text-gray-600">
                No coffee found for selected category or search.
              </p>
            </div>
          )}
        </>
      )}

      {/* MODAL */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedRecipe(null)}
          />
          <div className="relative w-full max-w-2xl rounded-3xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
            {/* header */}
            <div className="p-5 md:p-6 border-b border-gray-100 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
                  {selectedRecipe.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedRecipe.category} •{" "}
                  {selectedRecipe.price
                    ? `$${selectedRecipe.price.toFixed(2)}`
                    : "N/A"}
                </p>
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                ✕
              </button>
            </div>

            {/* body */}
            <div className="p-5 md:p-6 max-h-[70vh] overflow-y-auto">
              {selectedRecipe.image && (
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  className="w-full h-64 object-cover rounded-2xl mb-4"
                />
              )}

              {selectedRecipe.strInstructions ? (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-bold text-gray-900 mb-2">
                    Instructions
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {selectedRecipe.strInstructions}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-600">No instructions found.</p>
              )}

              {selectedRecipe.strYoutube && (
                <a
                  href={selectedRecipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center w-full rounded-2xl bg-red-500 hover:bg-red-600 text-white py-3 text-sm font-semibold transition"
                >
                  📺 Watch on YouTube
                </a>
              )}

              <button
                onClick={() => setSelectedRecipe(null)}
                className="mt-3 w-full rounded-2xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

}

export default Menu;
