import React, { useState } from "react";
import coffee1 from "../assets/photo/coffee1.png";
import coffee2 from "../assets/photo/coffee2.png";
import coffee3 from "../assets/photo/coffee3.png";
import coffee4 from "../assets/photo/coffee4.webp";

export default function Food() {
  const foodInfo = [
    {
      name: "Espresso",
      description:
        "A rich and bold shot of pure coffee with deep aroma and intense flavor.",
      ingredients: ["Arabica Beans", "Water"],
      image: coffee1,
    },
    {
      name: "Cappuccino",
      description:
        "Perfect balance of espresso, steamed milk, and creamy milk foam.",
      ingredients: ["Espresso", "Milk", "Milk Foam"],
      image: coffee2,
    },
    {
      name: "Latte",
      description:
        "Smooth and creamy coffee made with espresso and steamed milk.",
      ingredients: ["Espresso", "Steamed Milk"],
      image: coffee3,
    },
    {
      name: "Mocha",
      description:
        "A chocolate-flavored coffee drink topped with smooth milk foam.",
      ingredients: ["Espresso", "Chocolate", "Milk"],
      image: coffee4,
    },
    {
      name: "Americano",
      description:
        "Espresso diluted with hot water for a lighter coffee experience.",
      ingredients: ["Espresso", "Hot Water"],
      image: coffee1,
    },
    {
      name: "Iced Coffee",
      description: "Chilled coffee served over ice, refreshing and energizing.",
      ingredients: ["Coffee", "Ice"],
      image: coffee3,
    },
    {
      name: "Flat White",
      description: "Velvety smooth espresso drink with finely textured milk.",
      ingredients: ["Espresso", "Milk"],
      image: coffee2,
    },
  ];

  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(foodInfo.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const visibleFoods = foodInfo.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="min-h-screen bg-amber-50 px-4 py-12">
      <h1 className="mb-12 text-center text-3xl md:text-4xl font-bold text-amber-800">
        Our Coffee Menu
      </h1>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleFoods.map((food, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={food.image}
                alt={food.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                {food.name}
              </h2>
              <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                {food.description}
              </p>

              <div className="mb-4">
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                  Ingredients
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {food.ingredients.map((item, i) => (
                    <li
                      key={i}
                      className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="mt-2 w-full rounded-xl bg-amber-600 py-2 text-sm font-medium text-white transition hover:bg-amber-700">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="rounded-lg border border-amber-300 px-4 py-2 text-sm font-medium text-amber-700 disabled:opacity-40"
        >
          Prev
        </button>
        <span className="text-sm font-medium text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
}
