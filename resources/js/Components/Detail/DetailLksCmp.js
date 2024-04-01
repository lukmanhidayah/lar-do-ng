import isNullOrEmpty from "@/Utils/isNullOrEmpty";
import React from "react";
import indonesia from "date-fns/locale/id";
import format from "date-fns/format";

const DetailLksCmp = ({ data }) => {
    return (
        <div className="w-full rounded bg-white shadow">
            <div className="p-3 font-bold border-b text-md">Detail LKS</div>
            <div className="px-3">
                <table className="w-full profile-table">
                    <tbody>
                        <tr>
                            <td width={200}>Nama LKS</td>
                            <td width={15}>:</td>
                            <td>{data.name}</td>
                        </tr>
                        <tr>
                            <td width={200}>Alamat LKS</td>
                            <td width={15}>:</td>
                            <td>{data.alamat}</td>
                        </tr>
                        <tr>
                            <td width={200}>Email</td>
                            <td width={15}>:</td>
                            <td>{data.email}</td>
                        </tr>
                        <tr>
                            <td width={200}>No Telephone</td>
                            <td width={15}>:</td>
                            <td>{data.nomor_handphone}</td>
                        </tr>
                        <tr>
                            <td width={200}>NPWP</td>
                            <td width={15}>:</td>
                            <td>{data.npwp}</td>
                        </tr>
                        {!isNullOrEmpty(data.tanggal_expire) &&
                            !isNullOrEmpty(data.tanggal_perpanjang) && (
                                <tr>
                                    <td width={200}>Masa Berlaku</td>
                                    <td width={15}>:</td>
                                    <td>
                                        <span className="font-semibold">
                                            {format(
                                                new Date(
                                                    data.tanggal_perpanjang
                                                ),
                                                "dd-MM-yyyy",
                                                {
                                                    locale: indonesia,
                                                }
                                            )}{" "}
                                        </span>
                                        s/d{" "}
                                        <span className="font-semibold">
                                            {format(
                                                new Date(data.tanggal_expire),
                                                "dd-MM-yyyy",
                                                {
                                                    locale: indonesia,
                                                }
                                            )}
                                        </span>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DetailLksCmp;
