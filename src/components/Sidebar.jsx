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
                    <IoMdClose className="text-2xl cursor-pointer" />
                </button>
            </div>

            <nav className="p-4">
                <ul className="space-y-2">
                    <li>
                        <button className="w-full text-left p-3 rounded-md hover:bg-gray-200 transition cursor-pointer">
                            Home
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left p-3 rounded-md hover:bg-gray-200 transition cursor-pointer">
                            Categories
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left p-3 rounded-md hover:bg-gray-200 transition cursor-pointer">
                            My Cart
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left p-3 rounded-md hover:bg-gray-200 transition cursor-pointer">
                            Orders
                        </button>
                    </li>
                    <li>
                        <button className="w-full text-left p-3 rounded-md hover:bg-gray-200 transition cursor-pointer">
                            Profile
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;