import React, { createContext, useContext, useEffect, useState } from "react";

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Get the cart items from localStorage, if available
        const storedCart = localStorage.getItem("snapcart-cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        // Whenever cartItems change, update localStorage
        localStorage.setItem("snapcart-cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Function to add an item to the cart
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.$id === item.$id);
            if (existingItem) {
                // If item already exists, increase quantity
                return prevItems.map((i) =>
                    i.$id === item.$id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                // If item doesn't exist, add to cart with quantity 1
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    // Function to remove an item from the cart by ID
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.$id !== id));
    };

    // Function to clear the cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Function to update the quantity of a specific item in the cart
    const updateQuantity = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.$id === id ? { ...item, quantity } : item
            )
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
