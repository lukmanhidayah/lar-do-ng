import Dashboard from "@/Layouts/Dashboard";
import React, { useRef, useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import ArrowDownIcon from "@/Icon/ArrowDownIcon";

import { initData } from "@/Utils/initData";
import { Modal } from "@/Components/Dashboard/Modal";
import config from "@/config";
import Spinner from "@/Components/Spinner";

import "@/Assets/Css/my-table.css";

const ListLegalitas = (props) => {
    const goBack = () => {
        window.history.back();
    };

    const [data, setData] = useState({
        ...initData,
    });

    const [showModal, setShowModal] = useState(false);
    const [srcFileViewer, setSrcFileViewer] = useState(null);

    const refTable = useRef(null);

    const makeModalShow = (data) => {
        setShowModal(true);
        setTimeout(() => {
            setSrcFileViewer(data);
        }, 1000);
    };

    useEffect(() => {
        setData((prevState) => ({ ...prevState, ...props.data }));
    }, []);

    return (
        <Dashboard
            auth={props.auth}
            totalNotify={props.totalNotify}
            imageUrl={props?.identity?.logo}
        >
            <Head title="Dashboard | Sipelaku Sosial" />
            {showModal && (
                <Modal
                    backdropClick={() => {
                        setShowModal(false);
                        setSrcFileViewer(null);
                    }}
                >
                    <div className="w-4/5 h-full flex items-center bg-white justify-center overflow-hidden rounded animate-bounce-in">
                        {srcFileViewer == null ? (
                            <Spinner
                                width={32}
                                height={32}
                                type="primary-spinner"
                            />
                        ) : (
                            <iframe
                                className="w-full h-full"
                                loading="lazy"
                                title={srcFileViewer}
                                aria-hidden="true"
                                src={srcFileViewer}
                            ></iframe>
                        )}
                    </div>
                </Modal>
            )}
            <div className="w-full">
                <div className="text-xl font-bold mb-5 flex items-center">
                    <div
                        onClick={goBack}
                        className="transform rotate-90 cursor-pointer mr-2"
                    >
                        <ArrowDownIcon width={32} height={32} />
                    </div>
                    <span onClick={goBack} className="cursor-pointer">
                        Legalitas
                    </span>
                </div>
                <div className="relative px-2">
                    <div className="w-full min-h-3/4 bg-white rounded shadow flex flex-col">
                        <div className="py-4 w-full flex-1 overflow-y-auto">
                            <table ref={refTable} className="w-full">
                                <thead>
                                    <tr className="custom-table-header">
                                        <th>No</th>
                                        <th>Jenis Dokumen</th>
                                        <th className="text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="custom-table-body">
                                    <tr>
                                        <td className="px-4 py-5 text-ms">
                                            <div className="flex items-start h-full">
                                                1
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="text-sm">
                                                <div>
                                                    <b>
                                                        Akta Pendirian s/d Akte
                                                        Perubahan Terakhir (dari
                                                        notaris)
                                                    </b>
                                                </div>
                                                <ul className="list-inside bg-rose-200 ">
                                                    <li>
                                                        Jenis kesos tercantum
                                                        dalam maksud dan tujuan.
                                                    </li>
                                                    <li>
                                                        Nama pengurus dan
                                                        Yayasan tercantum dalam
                                                        akte
                                                        pendirian/perubahan.
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_akta_pendirian
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms">
                                            <div className="flex items-start h-full">
                                                2
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                <b>
                                                    Izin pendirian/pengesahan
                                                    Kemenkumham RI
                                                </b>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_izin_pendirian
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms">
                                            <div className="flex items-start h-full">
                                                3
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                <b>
                                                    Anggaran Dasar dan Anggaran
                                                    Rumah Tangga
                                                </b>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_adart
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms">
                                            <div className="flex items-start h-full">
                                                4
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                <b>
                                                    Susunan kepengurusan beserta
                                                    fotocopy KTP
                                                </b>
                                                <br />
                                                Minimal Ketua; Sekertaris;
                                                Bendahara
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_susunan_pengurus
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms">
                                            <div className="flex items-start h-full">
                                                5
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                <b>
                                                    Surat Keterangan Domisili
                                                    (terbaru) Dari Lurah sampai
                                                    Camat
                                                </b>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_surat_domisili
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms">
                                            <div className="flex items-start h-full">
                                                6
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                <b>Salinan NPWP</b>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_npwp
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms">
                                            <div className="flex items-start h-full">
                                                7
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                <b>
                                                    Laporan kegiatan (profil
                                                    LKS/Orsos) berserta foto
                                                    kegiatan
                                                </b>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_laporan_kegiatan
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms">
                                            <div className="flex items-start h-full">
                                                8
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                <b>
                                                    Data klien By Name By
                                                    Address
                                                </b>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_data_klien
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms">
                                            <div className="flex items-start h-full">
                                                9
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                <b>Foto plang Yayasan</b>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.foto_plang_yayasan
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms">
                                            <div className="flex items-start h-full">
                                                10
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                <b>Visi Misi Yayasan</b>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_visi_misi
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms">
                                            <div className="flex items-start h-full">
                                                11
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                <b>
                                                    Program kerja tahunan
                                                    Yayasan
                                                </b>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_proker
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default ListLegalitas;
