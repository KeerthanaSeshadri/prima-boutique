import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
    return (
        <div className="admin-layout" style={{ display: "flex", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
            <Sidebar />
            <div className="admin-content" style={{ flex: 1, marginLeft: "260px", padding: "30px", overflowY: "auto" }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
