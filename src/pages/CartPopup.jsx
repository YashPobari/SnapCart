import React, { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";

const CartPopup = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
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

  const totalAmount = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price);
    const quantity = parseInt(item.quantity, 10);

    if (!isNaN(price) && !isNaN(quantity)) {
      return acc + price * quantity;
    }
    return acc;
  }, 0);

  const handleDecreaseQuantity = (itemId, quantity) => {
    if (quantity > 1) {
      updateQuantity(itemId, quantity - 1);
    } else {
      removeFromCart(itemId); 
    }
  };

  return (
    <div
      ref={popupRef}
      className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg border-l z-50 overflow-y-auto flex flex-col"
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
        <div className="flex-1 p-4 space-y-4 overflow-auto">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 border-b pb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain"
              />
              <div className="flex flex-col flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm font-semibold text-gray-800">
                  {item.price}{" "}
                  <span className="text-xs text-gray-500">x {item.quantity}</span>
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      handleDecreaseQuantity(item.$id, item.quantity)
                    }
                    className="px-2 py-1 border rounded text-sm"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.$id, item.quantity + 1)}
                    className="px-2 py-1 border rounded text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between text-lg font-semibold mb-4">
            <span>Total:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <button
            onClick={() => alert("Checkout coming soon!")}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPopup;
