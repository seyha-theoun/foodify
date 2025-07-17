import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our <span className="text-amber-500">Delicious</span> Story
            </h1>
            <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
          </div>

          {/* Content Grid */}
          <div
            className="flex flex-col lg:flex-row items-center gap-12"
            data-aos="fade-up"
          >
            {/* Image Section */}
            <div className="lg:w-1/2" data-aos="zoom-in">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Our restaurant team"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <p className="text-xl font-medium">
                    "Food is our passion, service is our promise"
                  </p>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="lg:w-1/2" data-aos="fade-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Serving Happiness Since 2015
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Foodify began as a small family-owned restaurant with a simple
                mission: to bring people together through delicious food. What
                started as a humble kitchen with three tables has grown into a
                beloved food destination serving thousands of happy customers
                every day.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our chefs combine traditional recipes with modern techniques,
                using only the freshest ingredients sourced from local farmers
                and trusted suppliers. We believe good food should be accessible
                to everyone, which is why we've expanded our services to include
                delivery and meal kits.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div
                  className="text-center p-4 bg-amber-50 rounded-lg"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <p className="text-3xl font-bold text-amber-600">10K+</p>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div
                  className="text-center p-4 bg-amber-50 rounded-lg"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <p className="text-3xl font-bold text-amber-600">150+</p>
                  <p className="text-gray-600">Menu Items</p>
                </div>
                <div
                  className="text-center p-4 bg-amber-50 rounded-lg"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <p className="text-3xl font-bold text-amber-600">25+</p>
                  <p className="text-gray-600">Expert Chefs</p>
                </div>
              </div>

              <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300">
                Meet Our Team
              </button>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-24" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center"
                data-aos="flip-up"
              >
                <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Quality First
                </h3>
                <p className="text-gray-600">
                  We never compromise on ingredients or preparation methods,
                  ensuring every dish meets our high standards.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center"
                data-aos="flip-up"
                data-aos-delay="150"
              >
                <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Fast & Fresh
                </h3>
                <p className="text-gray-600">
                  Our streamlined processes ensure your food is prepared quickly
                  without sacrificing freshness or flavor.
                </p>
              </div>

              <div
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center"
                data-aos="flip-up"
                data-aos-delay="300"
              >
                <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Community Focus
                </h3>
                <p className="text-gray-600">
                  We support local producers and give back to our community
                  through various food programs and initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-16 bg-gradient-to-r from-amber-500 to-amber-600"
        data-aos="zoom-in-up"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience Authentic Cambodian Flavors?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Order now and get 20% off your first meal with code CAMBODIA20
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="../menu">
              <button className="bg-white hover:bg-gray-100 text-amber-600 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                Order Now
              </button>
            </a>
            <a href="../Contact">
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-600 font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
