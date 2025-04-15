import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const ProductItem = ({ product }) => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

  const quantity = cartItems.find((i) => i.$id === product.$id)?.quantity || 0;

  return (
    <div className="product bg-white p-4 rounded-xl shadow-md w-[200px] hover:shadow-lg transition duration-300">
      <Link to={`/product/${product.$id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-[150px] object-contain mb-4"
        />
        <h3 className="text-lg font-semibold hover:text-[#256a7a] transition">{product.name}</h3>
      </Link>
      <p className="text-[#31859c] font-semibold">Unit: {product.unit}</p>
      <p className="text-[#31859c] font-semibold">Price: {product.price}</p>

      <AddToCart product={product} /> {/* Use the AddToCart component here */}
    </div>
  );
};

export default ProductItem;
