import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const CartIcon = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative">
      <FaShoppingCart className="text-2xl cursor-pointer" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
