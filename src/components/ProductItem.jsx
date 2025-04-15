import React from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const ProductItem = ({ product }) => {

  return (
    <div className="product flex items-center flex-col bg-white p-4 rounded-xl shadow-md w-52 hover:shadow-lg transition duration-300">
      <Link to={`/product/${product.$id}`} className="h-56">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-[150px] object-contain   mb-4"
        />
        <h3 className="text-lg font-semibold hover:text-[#256a7a] transition">{product.name}</h3>
      </Link>
      <p className="text-[#31859c] font-semibold">Unit: {product.unit}</p>
      <p className="text-[#31859c] font-semibold">Price: ₹{product.productprice}</p>

      <AddToCart product={product} /> 
    </div>
  );
};

export default ProductItem;
