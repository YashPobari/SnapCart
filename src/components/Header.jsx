import React from "react";
import TopNav from "./TopNav";
import CategoryNav from "./CategoryNav";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <TopNav toggleSidebar={toggleSidebar} />
      <CategoryNav />
    </div>
  );
};

export default Header;