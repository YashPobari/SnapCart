import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

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

      {quantity === 0 ? (
        <button
          onClick={() => addToCart(product)}
          className="mt-2 px-4 py-2 bg-[#31859c] text-white rounded hover:bg-[#256a7a]"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center justify-center gap-3 mt-2">
          <button
            onClick={() =>
              quantity === 1
                ? removeFromCart(product.$id)
                : updateQuantity(product.$id, quantity - 1)
            }
            className="bg-[#31859c] text-white px-2 py-1 rounded hover:bg-[#256a7a]"
          >
            −
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.$id, quantity + 1)}
            className="bg-[#31859c] text-white px-2 py-1 rounded hover:bg-[#256a7a]"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
