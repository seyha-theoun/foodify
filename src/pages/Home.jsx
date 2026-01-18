import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchAllFoods } from "../api/FoodApi";
import FoodCard from "./KhmerFood";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import coffee from "../assets/photo/coffee1.png"

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
              <Link to="/menu">
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 flex items-center">
                  <span className="mr-2">🛒</span> Order Now
                </button>
              </Link>
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
                src="https://png.pngtree.com/png-clipart/20240810/original/pngtree-flying-cup-of-coffee-with-splash-and-png-image_15739217.png"
                alt="Cambodian food"
                className="rounded-xl shadow-2xl w-full h-auto transform hover:rotate-1 transition duration-500"
              />
              <div className="absolute -bottom-6 -right-6  bg-white p-4 rounded-xl shadow-lg hidden md:block animate-bounce">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-3">
                    <span className="text-2xl">💸</span>
                  </div>
                  <div>
                    <p className="font-bold text-amber-600">Special Offer</p>
                    <p className="text-sm text-amber-600">
                      20% off first order
                    </p>
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
                src="https://d2zyb4ugwufqpc.cloudfront.net/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/c/o/coffeecrop.jpg"
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

      {/* Coffee Features Section */}
      <section
        className="py-20 bg-gradient-to-b from-[#f9f5f0] to-[#f3ede4]"
        data-aos="fade-up"
      >
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Our <span className="text-amber-700">Coffee</span> Stands Out
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Crafted with passion, roasted to perfection, and brewed for true
              coffee lovers
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center"
              data-aos="zoom-in"
            >
              <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 text-3xl">
                ☕
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Specialty Beans
              </h3>
              <p className="text-gray-600">
                Premium Arabica beans sourced from high-altitude farms for rich
                aroma and flavor.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center"
              data-aos="zoom-in"
            >
              <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 text-3xl">
                🔥
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Fresh Roasted Daily
              </h3>
              <p className="text-gray-600">
                Small-batch roasted every day to ensure maximum freshness and
                bold taste.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center"
              data-aos="zoom-in"
            >
              <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-amber-100 text-3xl">
                🫘
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ethically Sourced
              </h3>
              <p className="text-gray-600">
                Direct-trade beans supporting local farmers and sustainable
                coffee farming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coffee Testimonials Section */}
      <section className="py-20 bg-[#fdf6f0]" data-aos="fade-up">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-amber-700">Coffee Lovers</span> Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from customers who’ve savored our freshly brewed creations
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The Cappuccino was smooth and perfectly balanced!",
                name: "Emma L.",
                role: "Coffee Enthusiast",
                rating: 5,
              },
              {
                quote: "I can’t start my day without their Cold Brew!",
                name: "James R.",
                role: "Daily Customer",
                rating: 5,
              },
              {
                quote:
                  "Rich aroma, bold flavor – simply the best coffee in town.",
                name: "Sophia K.",
                role: "Barista Blogger",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition duration-300"
                data-aos="zoom-in"
              >
                {/* Star Rating */}
                <div className="flex mb-4 justify-center">
                  {Array(testimonial.rating)
                    .fill("⭐")
                    .map((star, i) => (
                      <span key={i} className="text-amber-500 text-xl">
                        {star}
                      </span>
                    ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 italic mb-6 text-center">
                  "{testimonial.quote}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-full text-2xl">
                    👤
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
