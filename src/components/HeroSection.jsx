import React, { useEffect, useState } from "react";
import { appwriteDatabases } from "../appwrite/database";
import Spinner from "../components/Spinner";
import ProductItem from "../components/ProductItem";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await appwriteDatabases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_CATEGORIES
        );
        setCategories(response.documents);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchProductsByCategory = async (category) => {
    setSelectedCategoryId(category.$id);
    setSelectedCategoryName(category.name);
    setProductLoading(true);

    try {
      const productResponse = await appwriteDatabases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_PRODUCTS,
        [Query.equal("category", category.$id)]
      );

      const enrichedProducts = productResponse.documents.map((product) => ({
        ...product,
        imageUrl: product.imageURL || "https://via.placeholder.com/150",
      }));

      setProducts(enrichedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setProductLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <section
      className="relative bg-cover bg-center min-h-screen"
      style={{ backgroundImage: "url('/background_image.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center text-center text-white px-6 md:px-12 py-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Welcome to SnapCart
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Your one-stop shop for fresh groceries, delivered to your door!
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category.$id}
              onClick={() => navigate(`/category/${category.$id}`)} // 🆕 Replace fetchProductsByCategory
              className="bg-[#31859c] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#256a7a] transition duration-200"
            >
              Shop {category.name}
            </button>
          ))}
        </div>

        {selectedCategoryId && (
          <div className="w-full bg-white text-black px-6 py-10 rounded-xl max-w-7xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center capitalize">
              Products in "{selectedCategoryName}"
            </h2>
            {productLoading ? (
              <Spinner />
            ) : products.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-6">
                {products.map((product) => (
                  <ProductItem key={product.$id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No products found in this category.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
