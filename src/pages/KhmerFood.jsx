import React, { useState } from "react";
import amokFishImage from "../assets/photo/amokFish.webp";
import baiSachChroukImage from "../assets/photo/baiSachChrouk.jpg";
import nomBanhChokImage from "../assets/photo/nomBanhChok.jpg";
import samlorKorkoImage from "../assets/photo/samlorKorko.jpg";
import banchavImage from "../assets/photo/banchav.jpg";
import kuyteavImage from "../assets/photo/kuyteav.jpg";
import labkhmerImage from "../assets/photo/labkhmer.png";
import prahokktissImage from "../assets/photo/prahokktiss.jpg";

export default function Food() {
  const foodInfo = [
    {
      name: "Samlor Korko",
      description:
        "Samlor Korko is a traditional Cambodian soup made with a variety of vegetables, fish, and sometimes meat. It is known for its rich flavor and is often served with rice.",
      ingredients: ["Fish", "Vegetables", "Herbs", "Spices"],
      image: samlorKorkoImage,
    },
    {
      name: "Amok Fish",
      description:
        "Amok Fish is a classic Cambodian dish made with fish cooked in coconut milk and spices, often served in a banana leaf.",
      ingredients: ["Fish", "Coconut Milk", "Spices", "Banana Leaf"],
      image: amokFishImage,
    },
    {
      name: "Nom Banh Chok",
      description:
        "Nom Banh Chok is a popular Cambodian breakfast dish made with rice noodles, fish gravy, and fresh vegetables.",
      ingredients: ["Rice Noodles", "Fish Gravy", "Vegetables"],
      image: nomBanhChokImage,
    },
    {
      name: "Bai Sach Chrouk",
      description:
        "Bai Sach Chrouk is a traditional Cambodian dish consisting of grilled pork served over rice, often accompanied by pickled vegetables.",
      ingredients: ["Grilled Pork", "Rice", "Pickled Vegetables"],
      image: baiSachChroukImage,
    },
    {
      name: "Ban Chhev",
      description:
        "Ban Chhev is a Cambodian crepe filled with ground meat, bean sprouts, and served with herbs and dipping sauce.",
      ingredients: ["Rice Flour", "Turmeric", "Pork", "Mung Bean Sprouts"],
      image: banchavImage,
    },
    {
      name: "Kuy Teav",
      description:
        "Kuy Teav is a Cambodian noodle soup made from pork or beef bones with rice noodles, topped with fried garlic, scallions, and meat.",
      ingredients: ["Rice Noodles", "Pork/Beef Broth", "Garlic", "Scallions"],
      image: kuyteavImage,
    },
    {
      name: "Lap Khmer",
      description:
        "Lap Khmer is a Cambodian beef ceviche made with thinly sliced beef marinated in lime juice, herbs, and chili.",
      ingredients: ["Beef", "Lime Juice", "Herbs", "Chili"],
      image: labkhmerImage,
    },
    {
      name: "Prahok Ktis",
      description:
        "Prahok Ktis is a creamy Cambodian dip made from fermented fish, coconut milk, and minced pork, often served with fresh vegetables.",
      ingredients: ["Prahok", "Coconut Milk", "Pork", "Kaffir Lime"],
      image: prahokktissImage,
    },
  ];

  // Pagination setup
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(foodInfo.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleFoods = foodInfo.slice(startIndex, endIndex);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <section className="px-4 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-10">
        Traditional Cambodian Dishes
      </h1>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleFoods.map((food, index) => (
          <div
            key={`${food.name}-${index}`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={food.image}
              alt={`Image of ${food.name}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {food.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{food.description}</p>
              <h3 className="font-medium text-gray-700 mb-1">Ingredients:</h3>
              <ul className="text-sm text-gray-700 list-disc list-inside">
                {food.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-bold text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
