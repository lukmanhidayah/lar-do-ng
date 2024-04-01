import React, { useEffect, useState } from "react";
import Dashboard from "@/Layouts/Dashboard";
import { Head } from "@inertiajs/inertia-react";
import config from "@/config";
import DataTable from "react-data-table-component";
import Spinner from "@/Components/Spinner";
import emptySvg from "@/Assets/Images/empty.svg";
import ConsumerAppColumn from "@/Components/Column/ConsumerAppColumn";
import DeleteModal from "@/Components/modals/DeleteModal";
import axios from "axios";
import {
    initDataSubmitConsumerApp,
    initDataVeriMessage,
} from "@/Utils/initData";
import MessageModal from "@/Components/modals/MessageModal";
import ConsumerAppModal from "@/Components/modals/ConsumerAppModal";
import generatePassword from "@/Utils/generatePassword";
import checkObject from "@/Utils/checkObject";

const customStyles = {
    headCells: {
        style: {
            fontWeight: 600,
            fontSize: 14,
        },
    },
    rows: {
        style: {
            minHeight: 70,
            borderTop: "0px solid #f5f9fd",
        },
        stripedStyle: {
            backgroundColor: "#f5f9fd",
        },
    },
};

const ConsumerApp = (props) => {
    const [dataSubmit, setDataSubmit] = useState({
        ...initDataSubmitConsumerApp,
    });
    const [dataLks, setDataLks] = useState({
        total: 0,
        data: [],
    });
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (page === 0) {
            setPage(1);
        } else {
            getData(page, searchText);
        }
    }, [page, searchText]);

    const [message, setMessage] = useState({
        ...initDataVeriMessage,
    });

    const handleChangePage = (page) => {
        setDataLks({
            total: 0,
            data: [],
        });
        setIsLoading(true);
        setPage(page);
    };

    const handleSearchInput = (event) => {
        setIsLoading(true);
        setTimeout(() => {
            setSearchText(event.target.value);
            setPage(1);
        }, 300);
    };

    const onEdit = (val) => {
        setDataSubmit({
            type: "edit",
            id: val.id,
            username: val.username,
            password: val.password,
            description: val.description,
            dataTemp: val,
        });
        toggleModal();
    };

    const onDelete = (val) => {
        setDataSubmit((prevState) => ({
            ...prevState,
            type: "delete",
            id: val.id,
            username: val.username,
        }));
        toggleModal();
    };

    const onBackdropClick = () => {
        setDataSubmit({
            ...initDataSubmitConsumerApp,
        });
        toggleModal();
    };

    const onResetMessage = () => {
        setMessage({ ...initDataVeriMessage });
    };

    const gPassword = () => {
        setDataSubmit((prevState) => ({
            ...prevState,
            password: generatePassword(),
        }));
    };

    const onReset = () => {
        if (dataSubmit.type === "submit") {
            setDataSubmit({ ...initDataSubmitConsumerApp });
        } else {
            setDataSubmit((prevState) => ({
                ...prevState,
                type: "edit",
                id: prevState.dataTemp.id,
                username: prevState.dataTemp.username,
                password: prevState.dataTemp.password,
                description: prevState.dataTemp.description,
            }));
        }
    };

    const onHandleChange = (e) => {
        setDataSubmit((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const toggleModal = () => setShowModal((prevState) => !prevState);

    const onSubmit = () => {
        setDataSubmit((prevState) => ({
            ...prevState,
            isProcessing: true,
            isNull: false,
        }));

        // checking data
        if (
            !checkObject(dataSubmit, "username, password, description").status
        ) {
            setDataSubmit((prevState) => ({
                ...prevState,
                isProcessing: false,
                isNull: true,
            }));
            return;
        }

        // post data
        if (dataSubmit.type === "submit") {
            onPostData();
        } else {
            onPatchData();
        }
    };

    const getData = (page, searchText) => {
        axios
            .get(
                config.base_url +
                    `/consumer-app?page=${page}&name=${searchText}`,
                {
                    auth: {
                        username: "sipelaku",
                        password: "d1ns0sBDG2020",
                    },
                }
            )
            .then((res) => {
                setDataLks((prevState) => ({
                    ...prevState,
                    total: res.data.total,
                    data: res.data.data,
                }));
                setIsLoading(false);
            })
            .catch((err) => {
                if (err) {
                    setIsLoading(false);
                }
            });
    };

    const onPostData = () => {
        const payload = {
            username: dataSubmit.username,
            password: dataSubmit.password,
            description: dataSubmit.description,
        };

        axios
            .post(config.base_url + `/consumer-app`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },

                auth: {
                    username: "sipelaku",
                    password: "d1ns0sBDG2020",
                },
            })
            .then((res) => {
                if (res.data.code == 200) {
                    setDataSubmit({ ...initDataSubmitConsumerApp });
                    toggleModal();
                    setPage(0);
                    setIsLoading(true);
                    setMessage({
                        show: true,
                        error: false,
                        message:
                            res.data.message ||
                            `Tambah data berhasil dilakukan.`,
                    });
                } else {
                    setDataSubmit((prevState) => ({
                        ...prevState,
                        isProcessing: false,
                    }));
                    setMessage({
                        show: true,
                        error: true,
                        message:
                            res.data.message || `Tambah data gagal dilakukan.`,
                    });
                }
            })
            .catch((err) => {
                if (err) {
                    setDataSubmit((prevState) => ({
                        ...prevState,
                        isProcessing: false,
                    }));
                    setMessage({
                        show: true,
                        error: true,
                        message: err.message || `Tambah data gagal dilakukan.`,
                    });
                }
            });
    };

    const onPatchData = () => {
        const payload = {
            username: dataSubmit.username,
            password: dataSubmit.password,
            description: dataSubmit.description,
        };

        axios
            .patch(
                config.base_url + `/consumer-app?id=${dataSubmit.id}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },

                    auth: {
                        username: "sipelaku",
                        password: "d1ns0sBDG2020",
                    },
                }
            )
            .then((res) => {
                if (res.data.code == 200) {
                    setDataSubmit({ ...initDataSubmitConsumerApp });
                    toggleModal();
                    setPage(0);
                    setIsLoading(true);
                    setMessage({
                        show: true,
                        error: false,
                        message:
                            res.data.message ||
                            `Tambah data berhasil dilakukan.`,
                    });
                } else {
                    setDataSubmit((prevState) => ({
                        ...prevState,
                        isProcessing: false,
                    }));
                    setMessage({
                        show: true,
                        error: true,
                        message:
                            res.data.message || `Tambah data gagal dilakukan.`,
                    });
                }
            })
            .catch((err) => {
                if (err) {
                    setDataSubmit((prevState) => ({
                        ...prevState,
                        isProcessing: false,
                    }));
                    setMessage({
                        show: true,
                        error: true,
                        message: err.message || `Tambah data gagal dilakukan.`,
                    });
                }
            });
    };

    const onDeleteData = () => {
        setDataSubmit((prevState) => ({
            ...prevState,
            isProcessing: true,
        }));

        axios
            .delete(config.base_url + `/consumer-app?id=${dataSubmit.id}`, {
                auth: {
                    username: "sipelaku",
                    password: "d1ns0sBDG2020",
                },
            })
            .then((res) => {
                if (res.data.code == 200) {
                    setDataSubmit({ ...initDataSubmitConsumerApp });
                    toggleModal();
                    setPage(0);
                    setIsLoading(true);
                    setMessage({
                        show: true,
                        error: false,
                        message: `Delete data berhasil dilakukan.`,
                    });
                } else {
                    setDataSubmit((prevState) => ({
                        ...prevState,
                        isProcessing: false,
                    }));
                    setMessage({
                        show: true,
                        error: true,
                        message: `Delete data gagal dilakukan.`,
                    });
                }
            })
            .catch((err) => {
                if (err) {
                    setDataSubmit((prevState) => ({
                        ...prevState,
                        isProcessing: false,
                    }));
                    setMessage({
                        show: true,
                        error: true,
                        message: `Delete data gagal dilakukan.`,
                    });
                }
            });
    };

    return (
        <Dashboard
            auth={props.auth}
            totalNotify={props.totalNotify}
            imageUrl={props.identity?.logo}
        >
            <Head title="Consumer API | Sipelaku Sosial" />
            {showModal &&
                (dataSubmit.type == "delete" ? (
                    <DeleteModal
                        dataSubmit={{
                            name: dataSubmit.username,
                            isProcessing: dataSubmit.isProcessing,
                        }}
                        onBackdropClick={onBackdropClick}
                        onCancel={onBackdropClick}
                        onDelete={onDeleteData}
                    />
                ) : (
                    <ConsumerAppModal
                        dataSubmit={dataSubmit}
                        onHandleChange={onHandleChange}
                        onBackdropClick={onBackdropClick}
                        type={dataSubmit.type}
                        onReset={onReset}
                        onSubmit={onSubmit}
                        generatePassword={gPassword}
                    />
                ))}
            <MessageModal onResetMessage={onResetMessage} message={message} />
            <div className="dashboard-content min-h-full">
                <div className="bg-white w-full overflow-hidden h-full relative rounded-md shadow">
                    <div className="pt-5 pb-1 px-5  flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="font-semibold text-lg mb-2 md:mb-0 ">
                            Consumer APP
                            <p className="font-normal text-sm text-gray-700">
                                (Aplikasi yang diizinkan mengakses API)
                            </p>
                        </div>
                        <div className="flex w-full md:w-5/6 lg:w-3/6 gap-x-2 md:gap-x-4 justify-center md:justify-end">
                            <button
                                onClick={toggleModal}
                                type="button"
                                className="bg-primary-600 active:bg-primary-800 py-2 px-4 rounded shadow text-white font-bold"
                            >
                                Add{" "}
                                <span className="hidden md:inline-block">
                                    data
                                </span>
                            </button>
                            <div className="border w-full md:w-4/6 border-gray-300 rounded">
                                <input
                                    placeholder="Cari nama consumer app..."
                                    onChange={handleSearchInput}
                                    className="p-3 py-2 placeholder-gray-500 border-none text-black rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 w-full border"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="min-h-content-table flex flex-col justify-between ">
                        <DataTable
                            selectableRowDisabled
                            data={dataLks.data}
                            columns={ConsumerAppColumn.apply(null, [
                                page,
                                onEdit,
                                onDelete,
                            ])}
                            striped
                            progressPending={isLoading}
                            noDataComponent={
                                <div className="flex h-datable p-2 h-full flex-col justify-center items-center">
                                    <img
                                        draggable="false"
                                        className="w-32 select-none mt-20 mb-2"
                                        src={emptySvg}
                                        alt="empty-svg"
                                    />
                                    <strong className="text-lg text-primary-800">
                                        Data belum tersedia
                                    </strong>
                                    Belum ada data lembaga consumer app.
                                </div>
                            }
                            progressComponent={
                                <div className="flex h-datable p-2 h-full flex-col justify-center">
                                    <Spinner
                                        width={52}
                                        height={52}
                                        strokeWidth={3}
                                        type="primary-spinner"
                                    />
                                </div>
                            }
                            paginationComponentOptions={{
                                noRowsPerPage: true,
                            }}
                            customStyles={customStyles}
                            pagination
                            paginationServer
                            persistTableHead
                            paginationPerPage={10}
                            paginationDefaultPage={1}
                            paginationTotalRows={dataLks.total}
                            onChangePage={handleChangePage}
                        />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default ConsumerApp;
