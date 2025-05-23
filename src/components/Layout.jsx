import React from "react";
import TopNav from "./TopNav";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <TopNav />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
    );
};

export default Layout;
