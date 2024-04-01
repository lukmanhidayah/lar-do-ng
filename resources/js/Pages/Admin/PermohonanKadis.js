import Dashboard from "@/Layouts/Dashboard";
import React, { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import config from "@/config";
import "@/Assets/Css/my-table.css";

import { generateStatus, initData, initDataVeriMessage } from "@/Utils/initData";
import CustomTextArea from "@/Components/CustomTextArea";
import isNullOrEmpty from "@/Utils/isNullOrEmpty";
import Spinner from "@/Components/Spinner";
import { Modal } from "@/Components/Dashboard/Modal";
import CloseIcon from "@/Icon/CloseIcon";
import { Inertia } from "@inertiajs/inertia";
import LegalitasLksCmp from "@/Components/Detail/LegalitasLksCmp";
import PengurusLksCmp from "@/Components/Detail/PengurusLksCmp";
import DetailLksCmp from "@/Components/Detail/DetailLksCmp";
import MessageModal from "@/Components/modals/MessageModal";

const PermohonanKadis = (props) => {
    const { data, setData } = useForm({
        ...initData,
    });

    const [showModal, setShowModal] = useState(false);
    const [processing, setProcessing] = useState({
        status: false,
        name: "revisi", // or setujui
    });
    const [isNull, setIsNull] = useState(false);
    const [srcFileViewer, setSrcFileViewer] = useState(null);
    const [catatan, setCatatan] = useState("");
    const [verificationMessage, setVerificationMessage] = useState({
        ...initDataVeriMessage,
    });

    useEffect(() => {
        setData((prevState) => ({ ...prevState, ...props.data }));
    }, []);

    const makeModalShow = (data) => {
        setShowModal(true);
        setTimeout(() => {
            setSrcFileViewer(data);
        }, 1000);
    };

    

    const onResetVerificationMessage = () => {
        setVerificationMessage({
            ...initDataVeriMessage,
        });
    };

    const onRevisi = () => {
        onResetVerificationMessage();
        if (isNullOrEmpty(catatan)) {
            setIsNull(true);
            setVerificationMessage({
                show: true,
                error: true,
                message: (
                    <span>
                        Catatan harus diisi terlebih dahulu sebelum melakukan
                        revisi.
                    </span>
                ),
            });
        } else {
            setProcessing({
                status: true,
                name: "revisi",
            });
            Inertia.post(
                "revisi-kadis",
                {
                    user_id: props.id,
                    status_id: 4,
                    catatan: catatan,
                },
                {
                    onSuccess: (_) => {
                        setProcessing({
                            status: false,
                            name: "revisi",
                        });
                        setVerificationMessage({
                            show: true,
                            error: false,
                            message: `Revisi terhadap yayasan ${data.name} berhasil.`,
                        });
                    },
                    onError: (errors) => {
                        setProcessing({
                            status: false,
                            name: "revisi",
                        });
                        setVerificationMessage({
                            show: true,
                            error: true,
                            message: (
                                <span>
                                    {Object.keys(errors).map(function (
                                        key,
                                        index
                                    ) {
                                        return (
                                            <li key={index}>{errors[key]}</li>
                                        );
                                    })}
                                </span>
                            ),
                        });
                    },
                }
            );
        }
    };

    const onSetujui = () => {
        setProcessing({
            status: true,
            name: "setujui",
        });

        Inertia.post(
            "/permohonan/kadis",
            {
                user_id: props.id,
                status_id: 5,
            },
            {
                onSuccess: (_) => {
                    setProcessing({
                        status: false,
                        name: "setujui",
                    });
                    setVerificationMessage({
                        show: true,
                        error: false,
                        message: `Persejuan terhadap yayasan ${data.name} berhasil.`,
                    });
                },
                onError: (errors) => {
                    setProcessing({
                        status: false,
                        name: "setujui",
                    });
                    setVerificationMessage({
                        show: true,
                        error: true,
                        message: (
                            <span>
                                {Object.keys(errors).map(function (key, index) {
                                    return <li key={index}>{errors[key]}</li>;
                                })}
                            </span>
                        ),
                    });
                },
            }
        );
    };

    return (
        <Dashboard auth={props.auth} totalNotify={props.totalNotify}>
            <Head title="Permohonan | Sipelaku Sosial" />
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
            <MessageModal
                message={verificationMessage}
                onResetMessage={onResetVerificationMessage}
            />
            <div className="flex flex-col lg:flex-row jusity-between gap-y-4 lg:gap-y-0 gap-x-0 lg:gap-x-4 w-full">
                <div className="w-full lg:w-1/3 flex flex-col gap-y-3">
                    <div className="min-h-80 py-3 w-full rounded shadow bg-white relative overflow-hidden flex flex-col gap-y-2 px-2">
                        {data.logo != "" && (
                            <img
                                src={config.drive_url + data.logo}
                                className="max-h-full max-w-full"
                            />
                        )}

                        <div className="border-t w-full flex items-center justify-center flex-wrap py-5">
                            <strong className="mr-1">ID LKS:</strong>
                            <span>{data.no_reg}</span>
                            <div className="w-full pa-2 mt-2 flex items-center justify-center">
                                <div className="bg-gray-100 px-3 py-2 rounded-full text-xs">
                                    {generateStatus(data.status_id)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <LegalitasLksCmp
                        urlSlug={props.data.url_slug}
                        data={data}
                        makeModalShow={makeModalShow}
                    />
                </div>

                <div className="w-full lg:w-2/3 flex flex-col gap-y-3">
                    <DetailLksCmp data={data} />
                    <PengurusLksCmp data={data} />

                    <div className="w-full rounded bg-white shadow">
                        <div className="px-3 pt-3 font-bold border-b">
                            <CustomTextArea
                                id="catatan"
                                name="Catatan"
                                type="text"
                                isNull={isNull && isNullOrEmpty(catatan)}
                                mb="mb-2"
                                value={catatan}
                                handleChange={(e) => setCatatan(e.target.value)}
                            />
                        </div>
                        <div className="flex relative p-3 items-center justify-end">
                            <button
                                onClick={onRevisi}
                                disabled={processing.status}
                                className={`flex items-center w-24 h-10 justify-center bg-white active:bg-red-100 border border-red-500  py-2 px-4 rounded text-red-600 font-bold mr-4 ${
                                    processing.status && "opacity-75"
                                }`}
                            >
                                {processing.status &&
                                processing.name == "revisi" ? (
                                    <Spinner width={18} height={18} />
                                ) : (
                                    "Revisi"
                                )}
                            </button>

                            <button
                                disabled={processing.status}
                                className={`flex items-center w-24 h-10 justify-center bg-primary-600 active:bg-primary-800 py-2 px-4 rounded shadow text-white font-bold ml-2 ${
                                    processing.status && "opacity-75"
                                }`}
                                onClick={onSetujui}
                            >
                                {processing.status &&
                                processing.name == "setujui" ? (
                                    <Spinner width={18} height={18} />
                                ) : (
                                    "Setujui"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default PermohonanKadis;
