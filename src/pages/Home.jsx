import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../pages/Footer";

const Home = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const handleCategorySelect = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    return (
        <div className="relative min-h-screen bg-gray-100">
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main className="pt-0 px-4 sm:px-8">
                <HeroSection />
                <div>
                <Categories onSelectCategory={handleCategorySelect} />
                <Products selectedCategory={selectedCategory} />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
