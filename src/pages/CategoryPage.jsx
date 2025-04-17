import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { appwriteDatabases } from "../appwrite/database";
import { Query } from "appwrite";
import TopNav from "../components/TopNav";
import ProductItem from "../components/ProductItem";
import Spinner from "../components/Spinner"; 

const CategoryPage = () => {
  const { categoryId } = useParams();

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

  return (
    <div className="relative min-h-screen bg-gray-100">
      <TopNav />

      <main className="pt-20 px-4 sm:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center capitalize">
          Products in "{categoryName}"
        </h2>

        {loading ? (
          <Spinner />
        ) : products.length > 0 ? (
          <div className="product-list flex flex-wrap justify-center gap-6">
            {products.map((product) => (
              <ProductItem key={product.$id} product={product} />
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
