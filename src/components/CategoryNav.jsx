// src/components/CategoryNav.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appwriteDatabases } from "../appwrite/database";

const CategoryNav = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  const handleClick = (id) => {
    navigate(`/category/${id}`);
  };

  return (
    <div className="bg-white px-4 py-3 shadow-sm border-b top-16 z-20">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <div
            key={category.$id}
            onClick={() => handleClick(category.$id)}
            className="flex flex-col items-center min-w-[80px] cursor-pointer hover:bg-gray-100 rounded-xl px-2 py-1 transition"
          >
            <span className="text-sm font-medium text-gray-700 text-center capitalize">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
