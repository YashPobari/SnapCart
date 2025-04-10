import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const CartIcon = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.length;

  return (
    <div className="relative cursor-pointer">
      <FaShoppingCart size={24} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
