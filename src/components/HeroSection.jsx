import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/background_image.png')" }}>
      
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center text-center text-white px-6 md:px-12 py-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Welcome to SnapCart
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Your one-stop shop for fresh groceries, delivered to your door!
        </p>

        <div className="flex space-x-4">
          <Link to="/category/grains" className="bg-[#31859c] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#256a7a] transition duration-200">
            Shop Grains
          </Link>
          <Link to="/category/fruits" className="bg-[#31859c] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#256a7a] transition duration-200">
            Shop Fruits
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
