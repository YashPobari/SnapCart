import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const CartIcon = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative group transition duration-300 ease-in-out hover:scale-105">
      <FiShoppingCart className="text-[24px] text-slate-800 cursor-pointer group-hover:text-blue-600" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] w-[20px] h-[20px] flex items-center justify-center rounded-full font-semibold shadow-md">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
