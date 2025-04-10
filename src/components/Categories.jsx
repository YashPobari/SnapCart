// src/components/Categories.jsx
import React from "react";

const categories = [
    { name: "Fruits & Vegetables", icon: "🥦" },
    { name: "Dairy & Eggs", icon: "🥚" },
    { name: "Beverages", icon: "🥤" },
    { name: "Snacks", icon: "🍪" },
    { name: "Bakery", icon: "🍞" },
    { name: "Frozen Foods", icon: "❄️" },
];

const Categories = () => {
    return (
        <section className="py-6 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Shop by Categories</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-xl text-center px-6 py-4 cursor-pointer transition-transform transform hover:scale-105 w-40"
                    >
                        <div className="text-4xl mb-2">{category.icon}</div>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
