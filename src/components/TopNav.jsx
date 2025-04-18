import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import CartPopup from "../pages/CartPopup";
import { useCart } from "../context/CartContext";
import { account } from "../appwrite/config";
import { getProducts } from "../appwrite/products";
import {  PlacePicker } from '@googlemaps/extended-component-library/react';

const TopNav = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartItems } = useCart();
  const [user, setUser] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const locationInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const placeholders = [
    'Basmati Rice',
    'Fresh Bananas',
    'Tomatoes',
    'Balaji Wafers',
    'Thumsup',
    'Quartz Watch',
    'Jean Paul Perfume',
    'Hell Energy Drink',
    'Wheat'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const results = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [searchQuery, allProducts]);



  useEffect(() => {
    let listener;

    async function loadGoogleMapLocations() {
      let autocomplete;

      if (window.google && window.google.maps && locationInputRef.current) {
        const { PlaceAutocompleteElement } = await window.google.maps.importLibrary("places");

        autocomplete = new PlaceAutocompleteElement(
          {
            types: ["geocode"],
            componentRestrictions: { country: "in" },
          }
        );

        listener = autocomplete.addListener("places_changed", () => {
          const place = autocomplete.getPlace();
          const address = place?.formatted_address || place?.name;
          if (address) {
            setSelectedLocation(address);
            console.log("Selected Location:", address);
          }
        });

        const input = document.querySelector('input[aria-autocomplete="list"]');
        console.log("input: ", input);
        if (input) {
          input.placeholder = "Search for a location...";
        }
      }
    }

    loadGoogleMapLocations();

    return () => {
      if (listener) {
        window.google.maps.event.removeListener(listener);
      }
    };
  }, []);

  return (
    <div className="bg-white px-6 py-3 shadow-sm flex items-center justify-between border-b sticky top-0 z-10">
      <Link to="/" className="text-2xl font-semibold text-gray-800">
        SnapCart
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 mx-6">
        {/* <div className="text-sm text-gray-600 flex items-center gap-2">
          <span className="font-normal text-black">
            Delivery in {selectedLocation || "null"} minutes
          </span>
          <gmp-place-autocomplete className="custom-map-autofill"></gmp-place-autocomplete>
        </div> */}

       
        <div className="container" style={{ width: '400px', display: 'flex', flexDirection: 'column', fontSize: '1rem', gap: '10px' }}>
          <div className="text-sm text-gray-600 flex items-center gap-2 w-full">
            <span className="font-normal text-black mt-4 whitespace-nowrap">
              Delivery in
            </span>
             <PlacePicker
              country={["IN"]}
              placeholder="Enter your location"
              onPlaceChange={(e) => {
                const address = e?.formattedAddress || '';
                setSelectedLocation(address);
                console.log("Selected Location:", address);
              }}
              style={{
                flex: 1,
                height: "40px",
                borderRadius: "6px",
                padding: "0 10px",
                marginTop: "16px"
              }}
            /> 
          </div>
          <div className="result" style={{ height: '1rem', padding: '8px' }}>
            {selectedLocation}
          </div>
        </div>


        <div className="relative w-full sm:w-[60%]">
          <img
            src="https://cdn-icons-png.flaticon.com/128/149/149852.png"
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search for "${placeholders[placeholderIndex]}"`}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />


          {searchQuery && filteredProducts.length > 0 && (
            <div className="absolute left-0 right-0 bg-white shadow-md border mt-1 rounded-md max-h-64 overflow-y-auto z-50">
              {filteredProducts.map((product) => (
                <Link
                  key={product.$id}
                  to={`/product/${product.$id}`}
                  className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  onClick={() => setSearchQuery("")}
                >
                  {product.name}
                </Link>
              ))}
            </div>
          )}
        </div>

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
