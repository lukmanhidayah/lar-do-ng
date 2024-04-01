import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import logoSvg from "@/Assets/Images/logo-white.svg";
import { Link } from "@inertiajs/inertia-react";

export default function Guest({ children }) {
    return (
        <div className="bg-gradient min-h-screen px-8 flex flex-col justify-center items-center">
            <img
                draggable="false"
                className="w-52 md:w-64 select-none mb-8"
                src={logoSvg}
                alt="logo-dinsos"
            />

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
