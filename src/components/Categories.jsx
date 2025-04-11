import React, { useEffect, useState } from "react";
import { appwriteDatabases } from "../appwrite/database";
import { useNavigate } from "react-router-dom";

const Categories = () => {
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

    const handleCategoryClick = (name) => {
        const categorySlug = name.toLowerCase().replace(/\s+/g, "-");
        navigate(`/category/${categorySlug}`);
    };

    return (
        <section className="py-6 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Shop by Categories</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {categories.map((category) => (
                    <div
                        key={category.$id}
                        onClick={() => handleCategoryClick(category.$id)}
                        className="bg-white shadow-md rounded-xl text-center px-6 py-4 cursor-pointer transition-transform transform hover:scale-105 w-40"
                    >
                        {category.iconURL && (
                            <img
                                src={category.iconURL}
                                alt={category.name}
                                className="w-16 h-16 object-contain mx-auto mb-2"
                            />
                        )}
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
