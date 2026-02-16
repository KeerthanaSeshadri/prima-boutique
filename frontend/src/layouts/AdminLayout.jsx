import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: "250px" }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
