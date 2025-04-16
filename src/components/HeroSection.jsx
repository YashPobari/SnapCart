import React, { useEffect, useState } from "react";
import { Query } from "appwrite";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { appwriteDatabases } from "../appwrite/database";

const HeroSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("grains");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null); 
        console.log(`Fetching products for category: ${selectedCategory}`);
        const response = await appwriteDatabases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_PRODUCTS,
          [Query.equal("category", selectedCategory)] 
        );


        console.log("Fetched products:", response);

        if (response.documents && response.documents.length > 0) {
          setProducts(response.documents);
        } else {
          setProducts([]); 
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchCategoryProducts(); 
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section className="relative bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center text-center text-white px-6 md:px-12 py-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Welcome to SnapCart</h1>
        <p className="text-lg sm:text-xl mb-8">Your one-stop shop for fresh groceries, delivered to your door!</p>


        <div className="flex space-x-4 mb-10">
          <button
            onClick={() => handleCategoryChange("grains")}
            className="bg-[#31859c] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#256a7a] transition duration-200"
          >
            Shop Grains
          </button>
          <button
            onClick={() => handleCategoryChange("fruits")}
            className="bg-[#31859c] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#256a7a] transition duration-200"
          >
            Shop Fruits
          </button>
        </div>

        {loading && <p className="text-white mt-6">Loading products...</p>}
        {error && <p className="text-white mt-6">{error}</p>}

        {products.length > 0 && !loading ? (
          <div className="w-full max-w-6xl">
            <Carousel
              showThumbs={false}  
              infiniteLoop={true} 
              autoPlay={true}     
              interval={3000}     
              transitionTime={500} 
              stopOnHover={true}  
            >
              {products.map((product) => (
                <div key={product.$id} className="flex justify-center items-center">
                  <img
                    src={product.imageURL || "https://via.placeholder.com/200"} 
                    alt={product.name}
                    className="w-full h-64 object-contain rounded"
                  />
                  <div className="text-center mt-4">
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="text-lg mb-1">Price: {product.price}</p>
                    <p className="text-sm text-gray-600">Unit: {product.unit}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          !loading && <p className="text-white mt-6">No products found in this category.</p> 
        )}
      </div>
    </section>
  );
};

export default HeroSection;
