import React from "react";
import { useCart } from "../context/CartContext"; // Import useCart from the CartContext

const AddToCart = ({ product }) => {
    const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

    // Get the current quantity of the product in the cart, or default to 0
    const quantity = cartItems.find((item) => item.$id === product?.$id)?.quantity || 0;

    if (!product) return null; // If product is not available, return nothing

    return quantity === 0 ? (
        // If the product is not in the cart, show "Add to Cart" button
        <button
            onClick={() => addToCart(product)}
            className="mt-2 px-4 py-2 bg-[#31859c] text-white rounded hover:bg-[#256a7a]"
        >
            Add to Cart
        </button>
    ) : (
        // If the product is already in the cart, show quantity control buttons
        <div className="flex items-center gap-3 mt-2 justify-center">
            <button
                onClick={() =>
                    quantity === 1
                        ? removeFromCart(product.$id) // Remove product if quantity is 1
                        : updateQuantity(product.$id, quantity - 1) // Decrease quantity
                }
                className="bg-[#31859c] text-white px-2 py-1 rounded hover:bg-[#256a7a]"
            >
                −
            </button>
            <span className="font-medium">{quantity}</span>
            <button
                onClick={() => updateQuantity(product.$id, quantity + 1)} // Increase quantity
                className="bg-[#31859c] text-white px-2 py-1 rounded hover:bg-[#256a7a]"
            >
                +
            </button>
        </div>
    );
};

export default AddToCart;
