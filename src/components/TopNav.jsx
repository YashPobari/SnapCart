import React, { useState } from "react";
import { FiUser, FiShoppingCart, FiLayers } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import CartPopup from "../pages/CartPopup";
import { useCart } from "../context/CartContext";

const TopNav = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };


  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-white px-6 py-3 shadow-sm flex items-center justify-between border-b sticky
   top-0 z-10">

      <div className="text-2xl font-semibold text-gray-800">SnapCart</div>


      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 mx-6">
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span className="font-semibold text-black">Delivery in null minutes</span>
          <span className="border px-2 py-1 rounded-md border-gray-300 flex items-center gap-2">
            Select Your Location <FaChevronDown size={12} />
          </span>
        </div>
        <input
          type="text"
          placeholder='Search for "beverages"'
          className="w-full sm:w-[60%] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>


      <div className="flex items-center gap-6 text-gray-700 text-sm font-medium relative">
        <div className="flex items-center gap-1 rounded p-2 text-xs duration-300 hover:bg-slate-100 cursor-pointer">
          <FiUser size={18} />
          <span>Account</span>
        </div>


        <div
          className="relative flex items-center gap-1 rounded p-2 text-xs duration-300 hover:bg-slate-100 cursor-pointer"
          onClick={toggleCart}
        >
          <FiShoppingCart size={18} />
          <span>Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>


        <div className="flex items-center gap-1 rounded p-2 text-xs duration-300 hover:bg-slate-100 cursor-pointer">
          <FiLayers size={18} />
          <span>Compare</span>
        </div>
      </div>


      <CartPopup isOpen={isCartOpen} onClose={toggleCart} />
    </div>
  );
};

export default TopNav;
