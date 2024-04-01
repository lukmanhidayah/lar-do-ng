import Dropdown from "@/Components/Dropdown";
import ArrowDownIcon from "@/Icon/ArrowDownIcon";
import BellIcon from "@/Icon/BellIcon";
import BurgerIcon from "@/Icon/BurgerIcon";
import LogoutIcon from "@/Icon/LogoutIcon";
import { Link } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { useState } from "react";
import CustomLink from "../CustomLink";
import config from "@/config";
import isNullOrEmpty from "@/Utils/isNullOrEmpty";

const DashboardHeader = ({
    name,
    totalNotify = 0,
    onClickBurger,
    imageUrl,
}) => {
    const [currentPage, _] = useState(route().current().split("/")[0]);

    const logout = async () => {
        await axios.post("/logout", null);
        location.href = "/";

        setTimeout(disableBack, 0);
        window.onunload = function () {
            null;
        };
    };

    const disableBack = () => {
        window.history.forward();
    };

    const [isOpen, setIsOpen] = useState(false);

    const simpleName = () => {
        const tempName = name.split(" ");
        if (tempName.length > 1) {
            return (
                tempName[0].substring(0, 1) +
                "" +
                tempName[1].substring(0, 1)
            ).toUpperCase();
        }
        return tempName[0].substring(0, 2).toUpperCase();
    };

    const isDropDownOpen = (status) => {
        setIsOpen(status);
    };

    return (
        <div className="px-4 flex justify-between md:justify-start md:justify-end items-center w-full h-full">
            <div className="flex items-center">
                <div
                    className="block md:hidden cursor-pointer hover:bg-blue-10 p-2 rounded-full"
                    onClick={onClickBurger}
                >
                    <BurgerIcon />
                </div>
                <CustomLink
                    link="notification"
                    currentPage={currentPage}
                    className="block group relative mx-2 md:mx-5 w-10 h-10 md:w-12 md:h-12 focus:outline-none hover:bg-blue-10 p-2 rounded-full"
                >
                    <BellIcon className="stroke-current text-primary-600 " />
                    {totalNotify > 0 && (
                        <div className="absolute bg-red-600 px-1 top-0 text-xxs rounded-full right-0 text-white flex items-center justify-center">
                            {totalNotify < 100 ? totalNotify : "99+"}
                        </div>
                    )}
                </CustomLink>
            </div>
            <Dropdown callBack={isDropDownOpen} className="w-auto">
                <Dropdown.Trigger className="w-full">
                    <button className="flex justify-end md:justify-between items-center focus:outline-none w-full md:w-auto">
                        <div
                            className={`w-12 h-12 ${
                                isNullOrEmpty(imageUrl)
                                    ? "bg-gray-600"
                                    : "bg-white"
                            } rounded hidden md:flex justify-center items-center relative overflow-hidden border`}
                        >
                            <span className="font-bold text-white">
                                {isNullOrEmpty(imageUrl) ? (
                                    simpleName()
                                ) : (
                                    <img
                                        src={config.drive_url + imageUrl}
                                        className="w-full h-full"
                                    />
                                )}
                            </span>
                        </div>
                        <div className="ml-3">
                            <p className="text-xs leading-none text-left">
                                Selamat datang,
                            </p>
                            <h4 className="font-bold text-gray-800 leading-5 text-left">
                                {name}
                            </h4>
                        </div>
                        <div
                            className={`ml-8 transition transition-transform ${
                                isOpen && "transform rotate-180"
                            }`}
                        >
                            <ArrowDownIcon width="20px" height="20px" />
                        </div>
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Link onClick={logout}>
                        <div className="flex w-full justify-between items-center font-semibold">
                            Log Out <LogoutIcon />
                        </div>
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
};

export default DashboardHeader;
