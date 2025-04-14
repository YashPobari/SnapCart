import React, { useEffect, useState } from "react";
import { appwriteDatabases } from "../appwrite/database";
import { Link } from "react-router-dom";

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await appwriteDatabases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_CATEGORIES
        );
        setCategories(response.documents);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="py-8 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-6">Shop by Categories</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((category) => (
          <Link
            key={category.$id}
            to={`/category/${category.$id}`}
            className="category-item bg-white p-4 rounded shadow hover:bg-gray-200 transition"
            onClick={() => onSelectCategory(category.name)}
          >
            <img
              src={category.iconURL || "https://via.placeholder.com/100"}
              alt={category.name}
              className="w-16 h-16 mb-3 mx-auto"
            />
            <p className="text-center font-semibold">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
