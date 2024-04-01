import React, { useEffect, useState } from "react";
import DashboardHeader from "@/Components/Dashboard/DashboardHeader";
import DashboardSidebar from "@/Components/Dashboard/DashboardSidebar";
import "@/Assets/Css/dashboard.css";
import CloseIcon from "@/Icon/CloseIcon";

export default function Dashboard({
    auth,
    imageUrl,
    header,
    children,
    totalNotify = 0,
}) {
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        // console.log(auth)
    }, []);

    const toggleSidebar = () => {
        setShowSidebar((prevState) => !prevState);
    };

    return (
        <div id="dashboard" className="dashboard-container">
            <div id="modal-root"></div>
            <div className="dashboard-header-container">
                <DashboardHeader
                    onClickBurger={toggleSidebar}
                    imageUrl={imageUrl}
                    name={auth.user.name}
                    totalNotify={totalNotify}
                />
            </div>
            <div
                className={`dashboard-sidebar-container ${
                    showSidebar ? "block" : "hidden"
                } md:block`}
            >
                <div
                    onClick={toggleSidebar}
                    className="block md:hidden absolute right-5 top-5 z-30 p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-full cursor-pointer"
                >
                    <CloseIcon className="text-white" />
                </div>
                <DashboardSidebar userRole={auth.user.user_role_id} />
            </div>
            <div className="dashboard-content-container">{children}</div>
        </div>
    );
}
