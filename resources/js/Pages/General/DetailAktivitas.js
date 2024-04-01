import Dashboard from "@/Layouts/Dashboard";
import React, { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import config from "@/config";
import "@/Assets/Css/my-table.css";
import Spinner from "@/Components/Spinner";
import { Modal } from "@/Components/Dashboard/Modal";
import ArrowDownIcon from "@/Icon/ArrowDownIcon";

const DetailAktivitas = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [srcFileViewer, setSrcFileViewer] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);

    const [images] = useState(props.activity.image_url.split(","));

    useEffect(() => {
        console.log(props.activity);
    }, []);

    const makeModalShow = (data) => {
        setShowModal(true);
        setTimeout(() => {
            setSrcFileViewer(data);
        }, 1000);
    };

    const normalizeDate = (date) => {
        const newDate = new Date(date);
        let month = newDate.getMonth() + 1;

        if (month < 10) {
            month = "0" + month;
        }

        return newDate.getDate() + "-" + month + "-" + newDate.getFullYear();
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <Dashboard
            auth={props.auth}
            totalNotify={props.totalNotify}
            imageUrl={props.identity?.logo}
        >
            <Head title="Detail Kegiatan | Sipelaku Sosial" />
            {showModal && (
                <Modal
                    backdropClick={() => {
                        setShowModal(false);
                        setSrcFileViewer(null);
                    }}
                >
                    <div className="w-4/5 h-full flex items-center justify-center overflow-hidden rounded animate-bounce-in">
                        {srcFileViewer == null ? (
                            <Spinner
                                width={32}
                                height={32}
                                type="primary-spinner"
                            />
                        ) : (
                            <img
                                src={config.drive_url + images[selectedImage]}
                                className=" h-auto"
                            />
                        )}
                    </div>
                </Modal>
            )}
            <div className="text-xl font-bold mb-5 flex items-center">
                <div
                    onClick={goBack}
                    className="transform rotate-90 cursor-pointer mr-2"
                >
                    <ArrowDownIcon width={32} height={32} />
                </div>
                <span onClick={goBack} className="cursor-pointer">
                    Detail Aktivitas
                </span>
            </div>
            <div className="flex flex-col lg:flex-row jusity-between gap-y-4 lg:gap-y-0 gap-x-0 lg:gap-x-4 w-full">
                <div className="w-full lg:w-1/3 flex flex-col gap-y-3">
                    <div className="min-h-80 py-3 w-full rounded shadow bg-white relative overflow-hidden flex flex-col gap-y-2 px-2">
                        <div
                            className="w-full h-80 flex justify-center items-center cursor-pointer"
                            onClick={() => {
                                makeModalShow(
                                    config.drive_url + images[selectedImage]
                                );
                            }}
                        >
                            <img
                                src={config.drive_url + images[selectedImage]}
                                className=" h-full"
                            />
                        </div>

                        <div
                            className={`border-t w-full flex items-center ${
                                images.length == 5
                                    ? "justify-between"
                                    : "justify-start"
                            } gap-x-5 flex-wrap py-5`}
                        >
                            {images.map((res, index) => {
                                return (
                                    <div
                                        onClick={() => {
                                            setSelectedImage(index);
                                        }}
                                        key={index}
                                        className={`w-12 h-12 border-2 ${
                                            selectedImage == index &&
                                            "border-primary-400"
                                        } rounded cursor-pointer relative overflow-hidden`}
                                    >
                                        <img
                                            src={config.drive_url + res}
                                            className="w-full h-full"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-2/3 flex flex-col gap-y-3">
                    <div className="w-full rounded bg-white shadow">
                        <div className="p-3 border-b justify-between items-center">
                            <div className="flex items-center justify-between">
                                <p>{props.activity.lks}</p>
                                <p className="px-3 py-1 rounded-md bg-blue-10 font-semibold inline-block">
                                    {normalizeDate(props.activity.created_at)}
                                </p>
                            </div>
                            <p className="text-xl font-bold">
                                {props.activity.nama}
                            </p>
                            <p>{props.activity.deksripsi}</p>
                            <div className="mt-2 border-t">
                                <table className="w-full profile-table">
                                    <tbody>
                                        <tr>
                                            <td width={150}>Tujuan</td>
                                            <td width={15}>:</td>
                                            <td>{props.activity.tujuan}</td>
                                        </tr>
                                        <tr>
                                            <td width={150}>Maksud</td>
                                            <td width={15}>:</td>
                                            <td>{props.activity.maksud}</td>
                                        </tr>
                                        <tr>
                                            <td width={150}>Narasumber</td>
                                            <td width={15}>:</td>
                                            <td>{props.activity.narasumber}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="px-3"></div>
                    </div>
                    <div className="w-full rounded bg-white shadow">
                        <div className="flex p-3 border-b justify-between items-center">
                            <div className=" font-bold text-md">
                                Detail Aktivitas
                            </div>
                        </div>
                        <div className="px-3">
                            <table className="w-full profile-table">
                                <tbody>
                                    <tr>
                                        <td width={150}>Tempat</td>
                                        <td width={15}>:</td>
                                        <td>{props.activity.tempat}</td>
                                    </tr>
                                    <tr>
                                        <td width={150}>Sasaran</td>
                                        <td width={15}>:</td>
                                        <td>{props.activity.sasaran}</td>
                                    </tr>
                                    <tr>
                                        <td width={150}>Jumlah Peserta</td>
                                        <td width={15}>:</td>
                                        <td>
                                            {props.activity.jumlah.toLocaleString(
                                                "ID"
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width={150}>Total Anggaran</td>
                                        <td width={15}>:</td>
                                        <td>
                                            Rp
                                            {props.activity.total_anggaran.toLocaleString(
                                                "ID"
                                            )}
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

export default DetailAktivitas;
