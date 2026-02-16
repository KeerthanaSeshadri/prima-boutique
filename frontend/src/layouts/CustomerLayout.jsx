import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/customer/Navbar";

const CustomerLayout = () => {
    return (
        <div>
            <Navbar />
            <div style={{ minHeight: "80vh" }}>
                <Outlet />
            </div>
        </div>
    );
};

export default CustomerLayout;
