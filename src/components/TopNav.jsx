import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiShoppingCart, FiLayers } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import CartPopup from "../pages/CartPopup";
import { useCart } from "../context/CartContext";
import { account } from "../appwrite/config";

const TopNav = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartItems } = useCart();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const fetchUser = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
    } catch (error) {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      alert("Logged out successfully.");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="bg-white px-6 py-3 shadow-sm flex items-center justify-between border-b sticky top-0 z-10">
      <Link to="/" className="text-2xl font-semibold text-gray-800">
        SnapCart
      </Link>

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
        
        <div className="relative">
          <div
            className="flex items-center gap-2 rounded p-2 text-xs duration-300 hover:bg-slate-100 cursor-pointer"
            onClick={toggleDropdown}
          >
            <FiUser size={18} />
            {user ? (
              <>
                <span>Hello, {user.name}</span>
                <FaChevronDown size={12} />
              </>
            ) : (
              <Link to="/auth" className="underline text-blue-500">
                Login
              </Link>
            )}
          </div>

          {isDropdownOpen && user && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md border text-sm z-20 w-40">
              <Link
                to="/account"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                My Account
              </Link>
              <Link
                to="/orders"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>
            </div>
          )}
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
      </div>

      <CartPopup isOpen={isCartOpen} onClose={toggleCart} />
    </div>
  );
};

export default TopNav;
