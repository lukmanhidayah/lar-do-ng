import config from "@/config";
import { generateStatus } from "@/Utils/initData";
import { Link } from "@inertiajs/inertia-react";
import React from "react";
import DetailLksCmp from "../Detail/DetailLksCmp";
import LegalitasLksCmp from "../Detail/LegalitasLksCmp";
import PengurusLksCmp from "../Detail/PengurusLksCmp";
import DownloadCmp from "./DownloadCmp";

const normalizeDate = (date) => {
    const newDate = new Date(date);
    let month = newDate.getMonth() + 1;

    if (month < 10) {
        month = "0" + month;
    }

    return newDate.getDate() + "-" + month + "-" + newDate.getFullYear();
};

const AfterRegister = (props) => {
    return (
        <div className="flex flex-col lg:flex-row jusity-between gap-y-4 lg:gap-y-0 gap-x-0 lg:gap-x-4 w-full">
            <div className="w-full lg:w-1/3 flex flex-col gap-y-3">
                <div className="min-h-80 py-3 w-full rounded shadow bg-white relative overflow-hidden flex flex-col gap-y-2 px-2">
                    <img
                        src={config.drive_url + props.identity.logo}
                        className="max-h-full max-w-full"
                    />

                    <div className="border-t w-full flex items-center justify-center flex-wrap py-5">
                        <strong className="mr-1">ID LKS:</strong>
                        <span>{props.identity.no_reg}</span>
                        <div className="w-full pa-2 mt-2 flex items-center justify-center ">
                            <div className="bg-blue-10 font-semibold px-3 py-2 rounded-full text-xs">
                                <span className="font-bold">Status: </span>
                                {generateStatus(props.identity.status_id)}
                            </div>
                        </div>
                        {props.identity.status_id === 5 && (
                            <div className="w-full border-t flex items-center justify-center mt-5">
                                <DownloadCmp
                                    file={
                                        props.document.file_tanda_daftar_yayasan
                                    }
                                />
                            </div>
                        )}
                    </div>
                </div>
                <LegalitasLksCmp
                    urlSlug={props.auth.user.url_slug}
                    data={props.document}
                    makeModalShow={props.makeModalShow}
                />
            </div>

            <div className="w-full lg:w-2/3 flex flex-col gap-y-3">
                <DetailLksCmp
                    data={{
                        name: props.auth.user.name,
                        alamat: props.address.alamat,
                        email: props.auth.user.email,
                        nomor_handphone: props.identity.nomor_handphone,
                        npwp: props.identity.npwp,
                        tanggal_expire: props?.identity?.tanggal_expire,
                        tanggal_perpanjang: props?.identity?.tanggal_perpanjang,
                    }}
                />
                <PengurusLksCmp data={props.identity} />

                <div className="w-full rounded bg-white shadow">
                    <div className="flex p-3 border-b justify-between items-center">
                        <div className=" font-bold text-md">Kegiatan LKS</div>
                        {props.activities.length > 0 &&
                            props.identity.status_id == 5 && (
                                <Link
                                    href={route(
                                        "aktivitas/url_slug",
                                        props.auth.user.url_slug
                                    )}
                                    className="text-sm py-1 px-2 bg-primary-600 cursor-pointer select-none active:bg-primary-800 rounded text-white shadow"
                                >
                                    Lihat semua
                                </Link>
                            )}
                    </div>
                    <div className="px-3">
                        {props.activities.length > 0 &&
                        props.identity.status_id == 5 ? (
                            <table className="w-full profile-table">
                                <thead>
                                    <tr className="font-semibold border-b">
                                        <td width={200} className="text-sm">
                                            Tanggal Kegiatan
                                        </td>
                                        <td className="text-sm">
                                            Nama Kegiatan
                                        </td>
                                        <td className="text-center text-xs font-bold">
                                            Sasaran
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.activities.map((res, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="text-sm align-top">
                                                    {normalizeDate(res.tanggal)}
                                                </td>
                                                <td className="text-sm font-semibold align-top">
                                                    {res.nama}
                                                </td>
                                                <td className="text-center text-sm align-top">
                                                    {res.sasaran}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-4">
                                <div className="text-lg font-semibold text-center">
                                    Belum ada aktivitas
                                </div>
                                {props.identity.status_id != 5 ? (
                                    <div className="text-xs text-center">
                                        Anda baru dapat mengisi aktivitas
                                        setelah permohonan disetujui
                                    </div>
                                ) : (
                                    <div className="text-xs text-center">
                                        Silahkan isi aktivitas{" "}
                                        <Link
                                            className="text-blue-600 font-bold"
                                            href={route("input-kegiatan")}
                                        >
                                            disini
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AfterRegister;
