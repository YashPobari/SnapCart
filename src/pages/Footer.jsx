import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-4">
          <p>&copy; 2025 SnapCart. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-white hover:text-gray-400">Facebook</a>
            <a href="#" className="text-white hover:text-gray-400">Twitter</a>
            <a href="#" className="text-white hover:text-gray-400">Instagram</a>
          </div>
        </div>
        <div className="text-center">
          <p>Contact us: support@snapcart.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
