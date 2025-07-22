import React from 'react'

function Footer() {
  return (
    <>
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

export default Footer