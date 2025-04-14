import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, User2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = ({ toggleSidebar }) => {
  const { cartItems } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-[#31859c] focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="text-2xl font-bold text-[#31859c]">
              SnapCart
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center mx-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#31859c]"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/auth" className="flex items-center space-x-1 text-gray-700 hover:text-[#31859c]">
              <User2 className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">Login</span>
            </Link>
            <Link to="/cart" className="relative text-gray-700 hover:text-[#31859c]">
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1.5 text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
