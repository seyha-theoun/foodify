import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* Modern Call to Action */}
      <section className="relative overflow-hidden py-16 md:py-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />

        <div className="relative container mx-auto px-6">
          {/* Card */}
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/20 bg-white/10 p-8 md:p-12 shadow-2xl backdrop-blur-xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-white">
              <span className="text-lg">🎉</span>
              <span className="text-sm font-semibold tracking-wide">
                First order deal
              </span>
              <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
                -20%
              </span>
            </div>

            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              {/* Text */}
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Ready to taste authentic{" "}
                  <span className="text-white/90 underline decoration-white/40 underline-offset-8">
                    Cambodian flavors
                  </span>
                  ?
                </h2>

                <p className="mt-4 text-base md:text-lg text-white/85 max-w-xl">
                  Order now and get{" "}
                  <span className="font-semibold text-white">20% off</span> your
                  first meal with code:
                </p>

                {/* Promo code pill */}
                <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-black/10 px-4 py-3">
                  <span className="text-white/90">🏷️</span>
                  <span className="font-mono text-white font-bold tracking-widest">
                    CAMBODIA20
                  </span>

                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText("CAMBODIA20")}
                    className="ml-2 rounded-xl bg-white/15 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/25 transition focus:outline-none focus:ring-2 focus:ring-white/60"
                  >
                    Copy
                  </button>
                </div>

                <p className="mt-4 text-sm text-white/70">
                  Limited-time offer • No minimum order
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 md:justify-end">
                <Link to="/menu" className="w-full sm:w-auto">
                  <button className="w-full rounded-2xl bg-white px-6 py-3.5 font-semibold text-amber-700 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/70">
                    🛍️ Order Now
                  </button>
                </Link>

                <Link to="/contact" className="w-full sm:w-auto">
                  <button className="w-full rounded-2xl border border-white/40 bg-white/10 px-6 py-3.5 font-semibold text-white transition hover:bg-white/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/60">
                    📞 Contact Us
                  </button>
                </Link>
              </div>
            </div>

            {/* Bottom subtle line */}
            <div className="mt-10 h-px w-full bg-white/15" />
            <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-sm text-white/70">
              <p>© {new Date().getFullYear()} Khmer Food • Made with ❤️</p>
              <p className="text-white/60">
                Fresh • Fast delivery • Best taste
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
