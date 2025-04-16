import React, { useEffect, useState } from "react";
import { appwriteDatabases } from "../appwrite/database";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">
          Shop by Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category) => (
            <Link
              key={category.$id}
              to={`/category/${category.$id}`}
              className="w-[140px] sm:w-[160px] p-5 flex flex-col items-center justify-center text-center rounded-xl hover:scale-105 transition-all duration-300"
              onClick={() => onSelectCategory(category.name)}
            >
              <img
                src={category.iconURL || "https://via.placeholder.com/100"}
                alt={category.name}
                className="w-[120px] h-[120px] mb-4 object-fill"
              />
              <span className="text-sm text-slate-700 font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
