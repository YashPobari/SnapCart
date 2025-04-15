import React from "react";
import { useCart } from "../context/CartContext"; 

const AddToCart = ({ product }) => {
    const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();


    const quantity = cartItems.find((item) => item.$id === product?.$id)?.quantity || 0;

    if (!product) return null; 

    return quantity === 0 ? (

        <button
            onClick={() => addToCart(product)}
            className="mt-2 px-4 py-2 bg-[#31859c] text-white rounded hover:bg-[#256a7a]"
        >
            Add to Cart
        </button>
    ) : (

        <div className="flex items-center gap-3 mt-2 justify-center">
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
    );
};

export default AddToCart;
