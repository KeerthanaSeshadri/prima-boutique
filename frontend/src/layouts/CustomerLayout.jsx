import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/customer/Navbar";
import Footer from "../components/customer/Footer";

const CustomerLayout = () => {
    return (
        <div className="customer-layout">
            <Navbar />
            <main className="container my-section animate-fade-in" style={{ minHeight: "80vh" }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default CustomerLayout;
