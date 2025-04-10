import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../appwrite/auth";
import { FaBars } from "react-icons/fa";
import CartIcon from "./CartIcon";
import logo from "../assets/snapcart-logo.png"


const Navbar = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/auth");
  };

  return (
    <nav className="bg-amber-200 text-white px-4 py-3 flex justify-between items-center">
      <img
        src={logo}
        alt="SnapCart Logo"
        className="h-auto w-[150px] cursor-pointer object-contain"
        onClick={() => navigate("/")}
      />


      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-2xl cursor-pointer">
          <FaBars />
        </button>

        <CartIcon />
        {user ? (
          <>
            <span className="font-medium hidden sm:inline">Hi, {user.name} 👋</span>
            <button
              onClick={handleLogout}
              className="bg-white text-[#31859c] px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="bg-white text-[#31859c] px-3 py-1 rounded hover:bg-gray-100"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
