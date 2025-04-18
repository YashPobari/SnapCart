import React, { useEffect, useState, useRef } from "react";
import { appwriteDatabases } from "../appwrite/database";
import Spinner from "../components/Spinner";
import ProductItem from "../components/ProductItem";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";

const HeroSection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(false);
  const swiperRef = useRef(null);
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

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
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
    


  <Swiper
    ref={swiperRef}
    modules={[Navigation, Pagination, Autoplay]}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 2000, disableOnInteraction: false }}
    spaceBetween={30}
    slidesPerView={1}
  >

    <SwiperSlide>
      <div
        className="relative flex justify-center items-center"
        style={{
          backgroundImage: "url('/background_image.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-6 py-24">
          <h1 className="text-5xl font-semibold mb-4">
            Welcome to SnapCart
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-center">
            Your one-stop shop for fresh groceries, delivered to your door!
          </p>
          <button
            onClick={goToNextSlide}
            className="bg-[#31859c] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#256a7a] transition duration-200 mb-8"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </SwiperSlide>

    {categories.map((category) => (
      <SwiperSlide key={category.$id}>
        <div
          className="relative flex justify-center items-center"
          style={{
            backgroundImage: `url('${category.iconURL || "/default_category_image.png"}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center text-white px-6 py-24">
            <h2 className="text-3xl font-semibold mb-4">{category.name}</h2>
            <button
              onClick={() => navigate(`/category/${category.$id.toLowerCase()}`)}
              className="bg-[#31859c] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#256a7a] transition duration-200 mb-8"
            >
              Shop {category.name}
            </button>

            {selectedCategoryId === category.$id && (
              <div className="bg-white text-black px-6 py-10 rounded-xl shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-center capitalize">
                  Products in "{selectedCategoryName}"
                </h3>
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
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  );
};

export default HeroSection;
