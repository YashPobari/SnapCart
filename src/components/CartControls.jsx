import React from "react";
import { useCart } from "../context/CartContext";

const CartControls = ({ product }) => {
    const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
    const cartItem = cartItems.find((item) => item.$id === product.$id);

    const handleIncrement = () => {
        if (cartItem) {
            updateQuantity(product.$id, cartItem.quantity + 1);
        } else {
            addToCart(product);
        }
    };

    const handleDecrement = () => {
        if (cartItem && cartItem.quantity > 1) {
            updateQuantity(product.$id, cartItem.quantity - 1);
        } else {
            removeFromCart(product.$id);
        }
    };

    return (
        <div className="mt-2">
            {cartItem ? (
                <div className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-1 w-fit">
                    <button
                        onClick={handleDecrement}
                        className="text-xl text-red-600 font-bold"
                    >
                        −
                    </button>
                    <span className="min-w-[24px] text-center">
                        {cartItem.quantity}
                    </span>
                    <button
                        onClick={handleIncrement}
                        className="text-xl text-green-600 font-bold"
                    >
                        +
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => addToCart(product)}
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
                >
                    Add to Cart
                </button>
            )}
        </div>
    );
};

export {CartControls};
