import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; 
import Auth from "./pages/Auth"; 
import CartPopup from "./pages/CartPopup"; 
import CheckOut from "./pages/CheckOut"; 
import CategoryPage from "./pages/CategoryPage"; 
import ProductDetails from "./components/ProductDetails"; 

const App = () => {
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
