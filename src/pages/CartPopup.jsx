import React, { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";

const CartPopup = ({ isOpen, onClose }) => {
  const { cartItems } = useCart();
  const popupRef = useRef();

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); 
      }
    };

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose(); 
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey); 
    }

    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popupRef}
      className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg border-l z-50 overflow-y-auto"
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <button onClick={onClose} className="text-red-500 font-bold text-xl">
          &times;
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="p-4 text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="p-4 space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border-b pb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain"
              />
              <div className="flex flex-col">
                <h3 className="text-sm font-medium line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-sm font-semibold text-gray-800">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPopup;
