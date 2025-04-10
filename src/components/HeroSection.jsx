// src/components/HeroSection.jsx
import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-[#f8f9fa] py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Welcome to <span className="text-[#31859c]">SnapCart</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Your one-stop shop for groceries, delivered fast and fresh right to your door.
      </p>
    </section>
  );
};

export default HeroSection;
