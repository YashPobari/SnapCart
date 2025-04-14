import React, { useEffect, useState } from "react";
import { appwriteDatabases } from "../appwrite/database";
import ProductItem from "./ProductItem";

const Products = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

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

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <section className="products py-10 px-4 text-center">
      <h2 className="text-3xl font-bold mb-8">Popular Products</h2>
      <div className="product-list flex flex-wrap justify-center gap-6">
        {filteredProducts.map((product) => (
          <ProductItem key={product.$id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
