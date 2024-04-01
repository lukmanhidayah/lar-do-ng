import React, { useState } from "react";
import logoWhiteSvg from "@/Assets/Images/logo-white.svg";
import BerandaIcon from "@/Icon/BerandaIcon";
import PermohonanIcon from "@/Icon/PermohonanIcon";
import AktivitasIcon from "@/Icon/AktivitasIcon";
import ProfileIcon from "@/Icon/ProfileIcon";
import InputIcon from "@/Icon/InputIcon";
import CustomLink from "../CustomLink";
import ListIcon from "@/Icon/ListIcon";
import SettingIcon from "@/Icon/SettingIcon";
import ArrowDownIcon from "@/Icon/ArrowDownIcon";
import ExpandableLink from "../ExpandableLink";

const DashboardSidebar = ({ userRole }) => {
    const [currentPage] = useState(location.pathname.substring(1));
    return (
        <div className="dashboard-sidebar-content">
            <div className="dashboard-logo-container">
                <img className="w-24 select-none" src={logoWhiteSvg} />
            </div>
            <ul className="dashboard-nav-container">
                {userRole == 1 || userRole == 3 ? ( //if user is admin or kadis
                    <>
                        <li>
                            <CustomLink
                                currentPage={currentPage}
                                link="beranda"
                            >
                                <BerandaIcon className="stroke-current text-gray-100 w-5 icon" />
                                Beranda
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink
                                currentPage={currentPage}
                                link="permohonan"
                            >
                                <PermohonanIcon className="stroke-current text-gray-100 w-5 icon" />
                                Permohonan
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink
                                currentPage={currentPage}
                                link="aktivitas"
                            >
                                <AktivitasIcon className="stroke-current text-gray-100 w-5 icon" />
                                Aktivitas
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink
                                currentPage={currentPage}
                                link="daftar-lks"
                            >
                                <ListIcon className="stroke-current text-gray-100 w-5 icon" />
                                Daftar LKS
                            </CustomLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <CustomLink
                                currentPage={currentPage}
                                link="beranda"
                            >
                                <BerandaIcon className="stroke-current text-gray-100 w-5 icon" />
                                Beranda
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink
                                currentPage={currentPage}
                                link="profile"
                            >
                                <ProfileIcon className="stroke-current text-gray-100 w-5 icon" />
                                Profil LKS
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink
                                currentPage={currentPage}
                                link="input-kegiatan"
                            >
                                <InputIcon className="stroke-current text-gray-100 w-5 icon" />
                                Input Kegiatan
                            </CustomLink>
                        </li>
                    </>
                )}
                <li>
                    <div>
                        <ExpandableLink
                            currentPage={location.pathname.split("/")[1]}
                            expandableItem={
                                <ul className="expandable-item-container">
                                    {userRole == 1 && (
                                        <li className="expandable-item">
                                            <CustomLink
                                                currentPage={currentPage}
                                                link="settings/consumer-app"
                                            >
                                                Consumer App
                                            </CustomLink>
                                        </li>
                                    )}
                                    <li className="expandable-item">
                                        <CustomLink
                                            currentPage={currentPage}
                                            link="settings/change-password"
                                        >
                                            Change Password
                                        </CustomLink>
                                    </li>
                                </ul>
                            }
                            link="settings"
                        >
                            <SettingIcon className="stroke-current text-gray-100 w-5 icon" />
                            Setting
                            <div className="absolute right-0">
                                <ArrowDownIcon className="stroke-current text-gray-100 w-5 icon arrow-icon" />
                            </div>
                        </ExpandableLink>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default DashboardSidebar;
