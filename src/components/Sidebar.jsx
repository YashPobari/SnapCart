import React from "react";
import { IoMdClose } from "react-icons/io";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div
            className={`sidebar fixed top-0 left-0 h-full w-[250px] bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="sidebar-title flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">SnapCart</h2>
                <button onClick={toggleSidebar}>
                    <IoMdClose className="text-2xl" />
                </button>
            </div>

            <nav className="p-4">
                <ul className="space-y-2">
                    <li className="p-3 rounded-md hover:bg-gray-200 cursor-pointer transition">
                        Home
                    </li>
                    <li className="p-3 rounded-md hover:bg-gray-200 cursor-pointer transition">
                        Categories
                    </li>
                    <li className="p-3 rounded-md hover:bg-gray-200 cursor-pointer transition">
                        My Cart
                    </li>
                    <li className="p-3 rounded-md hover:bg-gray-200 cursor-pointer transition">
                        Orders
                    </li>
                    <li className="p-3 rounded-md hover:bg-gray-200 cursor-pointer transition">
                        Profile
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
