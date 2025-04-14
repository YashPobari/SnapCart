import React from "react";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <TopNav />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
