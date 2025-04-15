// The page that is being redirected and showing products.
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { appwriteDatabases } from "../appwrite/database";
import AddToCart from "../components/AddToCart";
import Spinner from "../components/Spinner"; 

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await appwriteDatabases.getDocument(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_COLLECTION_PRODUCTS,
                    productId
                );
                setProduct(response);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    if (!product) return <Spinner />;

    return (
        <div className="py-8 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <h2 className="text-3xl font-semibold text-center mb-6">{product.name}</h2>
                <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow">
                    <div className="w-full md:w-1/2">
                        <img
                            src={product.imageURL || "https://via.placeholder.com/400"}
                            alt={product.name}
                            className="w-full h-80 object-cover rounded-lg"
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <p className="text-xl font-semibold mb-2">Price: {product.price}</p>
                        <p className="mb-2 text-gray-700">Unit: {product.unit}</p>
                        <p className="mb-4 text-gray-600">
                            {product.description || "No description available."}
                        </p>
                        <AddToCart product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
