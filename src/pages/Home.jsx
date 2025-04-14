import React, { useState } from "react";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../pages/Footer";
import CategoryNav from "../components/CategoryNav";

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
            <TopNav toggleSidebar={toggleSidebar} />
            <CategoryNav />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main className="pt-16 px-4 sm:px-8">
                <HeroSection />
                <Categories onSelectCategory={handleCategorySelect} />
                <Products selectedCategory={selectedCategory} />
            </main>

            <Footer />
        </div>
    );
};

export default Home;
