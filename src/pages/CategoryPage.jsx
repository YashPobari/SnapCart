import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { appwriteDatabases } from "../appwrite/database";
import Navbar from "../components/Navbar";
import { Query } from "appwrite";
import { useCart } from "../context/CartContext";
import { CartControls } from "../components/CartControls"

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { addToCart } = useCart();

  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        const categoryDoc = await appwriteDatabases.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_CATEGORIES,
          categoryId
        );

        setCategoryName(categoryDoc.name);

        const productResponse = await appwriteDatabases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_PRODUCTS,
          [Query.equal("category", categoryId)]
        );

        const enrichedProducts = productResponse.documents.map((product) => ({
          ...product,
          imageUrl: product.imageURL || "https://via.placeholder.com/150",
        }));

        setProducts(enrichedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [categoryId]);

  const handleAddToCart = (product) => {
    addToCart(product);
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar />

      <main className="pt-20 px-4 sm:px-8">
        <div className="mb-6 text-left">
          <Link
            to="/"
            className="inline-block bg-[#31859c] text-white px-4 py-2 rounded hover:bg-[#256a7a] transition duration-200"
          >
            ← Back to Home
          </Link>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center capitalize">
          Products in "{categoryName}"
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : products.length > 0 ? (
          <div className="product-list flex flex-wrap justify-center gap-6">
            {products.map((product) => (
              <div
                key={product.$id}
                className="bg-white p-4 rounded-xl shadow-md w-[200px] hover:shadow-lg transition duration-300"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-[150px] object-contain mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-[#31859c] font-semibold">
                  Unit: {product.unit}
                </p>
                <p className="text-[#31859c] font-semibold">
                  Price: {product.price}
                </p>
                <CartControls product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found in this category.</p>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
