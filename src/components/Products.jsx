import React, { useEffect, useState } from "react";
import { appwriteDatabases } from "../appwrite/database";
import { useCart } from "../context/CartContext";

const Products = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await appwriteDatabases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_PRODUCTS
        );

        const enrichedProducts = response.documents.map((product) => ({
          ...product,
          imageUrl: product.imageURL || "https://via.placeholder.com/150",
        }));

        setProducts(enrichedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const getProductQuantity = (productId) => {
    const item = cartItems.find((i) => i.$id === productId);
    return item?.quantity || 0;
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <section className="products py-10 px-4 text-center">
      <h2 className="text-3xl font-bold mb-8">Popular Products</h2>
      <div className="product-list flex flex-wrap justify-center gap-6">
        {filteredProducts.map((product) => {
          const quantity = getProductQuantity(product.$id);

          return (
            <div
              key={product.$id}
              className="product bg-white p-4 rounded-xl shadow-md w-[200px] hover:shadow-lg transition duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-[150px] object-contain mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
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
                    onClick={() => {
                      if (quantity === 1) {
                        removeFromCart(product.$id);
                      } else {
                        updateQuantity(product.$id, quantity - 1);
                      }
                    }}
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
        })}
      </div>
    </section>
  );
};

export default Products;
