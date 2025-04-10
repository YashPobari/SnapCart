import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import Products from "../components/Products";

const Home = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("")
    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <div className="relative min-h-screen bg-gray-100">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main className="pt-16 px-4 sm:px-8">
                <HeroSection />
                <Categories onSelectCategory={(category) => setSelectedCategory(category)} />
                <Products selectedCategory={selectedCategory} />
            </main>
        </div>
    );
};

export default Home;
