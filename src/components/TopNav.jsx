import React from "react";
import { FiUser, FiShoppingCart, FiLayers } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";

const TopNav = () => {
  return (
    <div className="bg-white px-6 py-3 shadow-sm flex items-center justify-between border-b">
      
      <div className="text-2xl font-semibold text-gray-800">
        SnapCart
      </div>

      
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 mx-6">
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span className="font-semibold text-black">Delivery in null minutes</span>
          <span className="border px-2 py-1 rounded-md border-gray-300 flex items-center gap-1">
            Select Your Location <FaChevronDown size={12} />
          </span>
        </div>

        <input
          type="text"
          placeholder='Search for "beverages"'
          className="w-full sm:w-[60%] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      
      <div className="flex items-center gap-6 text-gray-700 text-sm font-medium">
        <div className="flex items-center gap-2 cursor-pointer">
          <FiUser size={18} />
          <span>Account</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <FiShoppingCart size={18} />
          <span>Cart</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <FiLayers size={18} />
          <span>Compare</span>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
