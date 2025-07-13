// src/api/foodAPI.js

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Fetch all meals
export async function fetchAllFoods() {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=`);
    const data = await response.json();

    // API returns { meals: [...] } or { meals: null }
    return Array.isArray(data.meals) ? data.meals : [];
  } catch (error) {
    console.error("Failed to fetch food items:", error);
    return []; // return empty array to prevent .map() crash
  }
}

// Fetch single meal by ID
export async function fetchFoodById(id) {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();

    // Return the first meal object, or null
    return Array.isArray(data.meals) ? data.meals[0] : null;
  } catch (error) {
    console.error("Failed to fetch food item:", error);
    return null;
  }
}
