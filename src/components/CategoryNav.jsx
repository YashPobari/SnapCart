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
    <div className="relative flex justify-between border-b bg-white px-8 py-2.5 max-lg:hidden max-md:flex max-md:px-2">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <div
            key={category.$id}
            onClick={() => handleClick(category.$id)}
            className="flex flex-col items-center min-w-[80px] cursor-pointer rounded-xl px-2 py-1 transition"
          >
            <span className="relative flex w-fit text-sm text-slate-700 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-slate-700 after:transition-all after:duration-300 hover:after:w-full">
              {category.name}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
