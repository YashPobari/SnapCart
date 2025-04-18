import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CartPopup from "./pages/CartPopup";
import CheckOut from "./pages/CheckOut";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./components/ProductDetails";
import { APILoader } from "@googlemaps/extended-component-library/react";
// import { APILoader } from "@googlemaps/extended-component-library/react";

const App = () => {
  <APILoader apiKey="AIzaSyB8cIQPc-Te3kBOs_fpKxWcixU8NKmiDTM"  solutionChannel="GMP_GCC_placepicker_v1" />
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPopup />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </Router>
    
  );
};

export default App;
