import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import Spinner from "../components/Spinner";

const ProductItem = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setIsLoading(false);
    }
  }, [product]);

  const isOutOfStock = product.inStock === false;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-52 h-56">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="product flex items-center flex-col bg-white p-4 text-center rounded-xl shadow-md w-52 hover:shadow-lg transition duration-300">
      <Link to={`/product/${product.$id}`} className="h-56">
        <img
          src={product.imageUrl || "https://via.placeholder.com/150"}
          alt={`Image of ${product.name}`}
          className="w-full h-[150px] object-contain mb-4"
        />
        <h3 className="text-lg font-semibold hover:text-[#256a7a] transition">
          {product.name}
        </h3>
      </Link>
      <p className="text-[#31859c] font-semibold">Unit: {product.unit}</p>
      <p className="text-[#31859c] font-semibold">Price: {product.price}</p>

      {product.inStock ? (
        <AddToCart product={product} />
      ) : (
        <p className="text-red-500 font-semibold mt-2">Out of Stock</p>
      )}
    </div>
  );

};

export default ProductItem;
