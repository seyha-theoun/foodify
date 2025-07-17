import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchAllFoods } from "../api/FoodApi";
import FoodCard from "./KhmerFood";

function Home() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    async function getFoods() {
      try {
        const data = await fetchAllFoods();
        setFoods(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    }

    getFoods();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-orange-50 to-amber-50 overflow-hidden"
        data-aos="fade"
      >
        {/* Floating Food Icons */}
        <div className="hidden md:block absolute top-20 left-10 text-4xl opacity-20 animate-float">
          🍜
        </div>
        <div className="hidden md:block absolute top-1/3 right-20 text-4xl opacity-20 animate-float-delay">
          🍔
        </div>
        <div className="hidden md:block absolute bottom-1/4 left-1/4 text-4xl opacity-20 animate-float">
          🥗
        </div>
        <div className="hidden md:block absolute bottom-20 right-10 text-4xl opacity-20 animate-float-delay">
          🍛
        </div>

        <div className="container h-screen mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0" data-aos="fade-right">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Discover <span className="text-amber-600">Authentic</span>{" "}
              Cambodian Cuisine
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Experience the rich flavors of Cambodia with our handcrafted
              dishes made from traditional recipes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="../menu">
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 flex items-center">
                  <span className="mr-2">🛒</span> Order Now
                </button>
              </a>
              <button className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 flex items-center">
                <span className="mr-2">📖</span> Explore Recipes
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white"
                    src="https://randomuser.me/api/portraits/women/12.jpg"
                    alt="Customer"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Customer"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white"
                    src="https://randomuser.me/api/portraits/women/45.jpg"
                    alt="Customer"
                  />
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  😊 500+ Happy Customers
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xl text-amber-500 mr-1">⭐</span>
                <span className="text-sm text-gray-600">
                  4.9 (1.2k Reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center" data-aos="zoom-in">
            <div className="relative w-full max-w-md">
              <img
                src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b"
                alt="Cambodian food"
                className="rounded-xl shadow-2xl w-full h-auto transform hover:rotate-1 transition duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg hidden md:block animate-bounce">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-3">
                    <span className="text-2xl">💸</span>
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
      </section>

      {/* Popular Food Section */}
      <section className="py-16 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-amber-600">Signature</span> Dishes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Taste the essence of Cambodia with these chef-recommended
              specialties
            </p>
          </div>

          <div className="min-h-[200px]">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
              </div>
            ) : (
              <div>
                <FoodCard food={foods[0]} key={foods[0]?.id || 0} />
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <a href="../menu">
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105 flex items-center mx-auto">
                <span className="mr-2">📋</span> View Full Menu
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Cambodian Cuisine Story */}
      <section className="py-16 bg-amber-50" data-aos="fade-right">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <img
                src="https://images.unsplash.com/photo-1585032226651-759b368d7246"
                alt="Cambodian street food"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                The <span className="text-amber-600">Heritage</span> of
                Cambodian Cuisine
              </h2>
              <p className="text-gray-600 mb-4">
                Cambodian cuisine is one of the world's oldest living
                cuisines...
              </p>
              <p className="text-gray-600 mb-6">
                Each recipe in our menu has been carefully curated...
              </p>
              <button className="border-2 border-amber-500 text-amber-600 hover:bg-amber-100 font-semibold py-2 px-6 rounded-lg transition duration-300">
                🍃 Learn About Our Ingredients
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why <span className="text-amber-600">Choose</span> Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to bringing you the best Cambodian dining
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300"
              data-aos="zoom-in"
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Delivered in under 30 minutes or it's free!
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300"
              data-aos="zoom-in"
            >
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Fresh ingredients prepared by skilled chefs
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition duration-300"
              data-aos="zoom-in"
            >
              <div className="text-4xl mb-4">🌾</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Local Sourcing
              </h3>
              <p className="text-gray-600">
                90% of ingredients sourced locally in Cambodia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our <span className="text-amber-600">Customers</span> Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The Amok Trey was absolutely divine!",
                name: "Sophia R.",
                role: "Food Blogger",
                rating: 5,
              },
              {
                quote: "Best Khmer food I've had outside Cambodia.",
                name: "David K.",
                role: "Travel Enthusiast",
                rating: 5,
              },
              {
                quote: "Their Nom Banh Chok took me right back to Siem Reap!",
                name: "Lina M.",
                role: "Cambodian Expat",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                data-aos="zoom-in"
              >
                <div className="flex mb-4">
                  {Array(testimonial.rating)
                    .fill("⭐")
                    .map((star, i) => (
                      <span key={i} className="text-xl text-amber-500">
                        {star}
                      </span>
                    ))}
                </div>
                <p className="text-gray-600 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="text-2xl bg-amber-100 p-2 rounded-full mr-4">
                    👤
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-16 bg-gradient-to-r from-amber-500 to-amber-600"
        data-aos="zoom-in"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience Authentic Cambodian Flavors?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            🥳 Order now and get 20% off your first meal with code{" "}
            <strong>CAMBODIA20</strong>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="../menu">
              <button className="bg-white hover:bg-gray-100 text-amber-600 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                🛍️ Order Now
              </button>
            </a>
            <a href="../Contact">
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-600 font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
                📞 Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
