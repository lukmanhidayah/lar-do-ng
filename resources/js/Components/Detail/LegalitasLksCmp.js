import config from "@/config";
import isNullOrEmpty from "@/Utils/isNullOrEmpty";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

const LegalitasLksCmp = ({ urlSlug, makeModalShow, data }) => {
    return (
        <div className="w-full rounded bg-white shadow">
            <div className="flex p-3 border-b justify-between items-center">
                <div className="font-bold text-md">Legalitas LKS</div>
                <Link
                    href={route("legalitas/url_slug", urlSlug)}
                    className="text-sm py-1 px-2 bg-primary-600 cursor-pointer select-none active:bg-primary-800 rounded text-white shadow"
                >
                    Lihat semua
                </Link>
            </div>
            <div className="px-3">
                <table className="w-full profile-table">
                    <tbody>
                        {!isNullOrEmpty(data.file_tanda_daftar_yayasan) && (
                            <tr>
                                <td>Tanda Daftar Yayasan</td>
                                <td>
                                    <span
                                        onClick={() =>
                                            makeModalShow(
                                                config.drive_url +
                                                    data.file_tanda_daftar_yayasan
                                            )
                                        }
                                        className="bg-blue-100 py-1 px-2 rounded-full text-xs cursor-pointer"
                                    >
                                        Lihat
                                    </span>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td>Akta Notaris</td>
                            <td>
                                <span
                                    onClick={() =>
                                        makeModalShow(
                                            config.drive_url +
                                                data.file_akta_pendirian
                                        )
                                    }
                                    className="bg-blue-100 py-1 px-2 rounded-full text-xs cursor-pointer"
                                >
                                    Lihat
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>SK Kemenkum HAM</td>
                            <td>
                                <span
                                    onClick={() =>
                                        makeModalShow(
                                            config.drive_url +
                                                data.file_izin_pendirian
                                        )
                                    }
                                    className="bg-blue-100 py-1 px-2 rounded-full text-xs cursor-pointer"
                                >
                                    Lihat
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Anggaran Dasar dan Rumah Tangga</td>
                            <td>
                                <span
                                    onClick={() =>
                                        makeModalShow(
                                            config.drive_url + data.file_adart
                                        )
                                    }
                                    className="bg-blue-100 py-1 px-2 rounded-full text-xs cursor-pointer"
                                >
                                    Lihat
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Surat Keterangan Domisili</td>
                            <td>
                                <span
                                    onClick={() =>
                                        makeModalShow(
                                            config.drive_url +
                                                data.file_surat_domisili
                                        )
                                    }
                                    className="bg-blue-100 py-1 px-2 rounded-full text-xs cursor-pointer"
                                >
                                    Lihat
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LegalitasLksCmp;
