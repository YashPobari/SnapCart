import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const CategoryPage = () => {
    const { categoryName } = useParams();
    const formattedCategory = categoryName.replace(/-/g, " ");

    return (
        <div className="relative min-h-screen bg-gray-100">
            <Navbar />
        </div>
    );
};

export default CategoryPage;
