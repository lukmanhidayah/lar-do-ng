import React, { useEffect, useState } from "react";
import Dashboard from "@/Layouts/Dashboard";
import { Head } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Spinner from "@/Components/Spinner";
import config from "@/config";
import LksNotCheckedColumn from "@/Components/Column/LksNotCheckedColumn";
import LksCheckedColumn from "@/Components/Column/LksCheckedColumn";
import emptySvg from "@/Assets/Images/empty.svg";

const Permohonan = (props) => {
    const [dataLks, setDataLks] = useState({
        notChecked: {
            total: 0,
            data: [],
        },
        checked: {
            total: 0,
            data: [],
        },
    });

    const [defaultIndex, setDefaultIndex] = useState(props.tabIndex);

    const [page, setPage] = useState({
        checked: 1,
        notChecked: 1,
    });

    const [isLoading, setIsLoading] = useState({
        checked: true,
        notChecked: true,
    });

    useEffect(() => {
        axios
            .get(
                config.base_url +
                    `/lks/simple?page=${page.notChecked}&status=${
                        props.auth.user.user_role_id == 1 ? "2" : "3"
                    }`,
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
                    notChecked: {
                        total: res.data.total,
                        data: res.data.data,
                    },
                }));
                setIsLoading((prevState) => ({
                    ...prevState,
                    notChecked: false,
                }));
            })
            .catch((err) => {
                if (err) {
                    setIsLoading((prevState) => ({
                        ...prevState,
                        notChecked: false,
                    }));
                }
            });
    }, [page.notChecked]);

    useEffect(() => {
        axios
            .get(
                config.base_url +
                    `/log/admin?page=${page.checked}&id=${props.auth.user.id}`,
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
                    checked: {
                        total: res.data.total,
                        data: res.data.data,
                    },
                }));
                setIsLoading((prevState) => ({
                    ...prevState,
                    checked: false,
                }));
            })
            .catch((err) => {
                if (err) {
                    setIsLoading((prevState) => ({
                        ...prevState,
                        checked: false,
                    }));
                }
            });
    }, [page.checked]);

    const handleInput = (page, type) => {
        setDataLks((prevState) => ({
            ...prevState,
            [type]: { total: 0, data: [] },
        }));
        setIsLoading((prevState) => ({
            ...prevState,
            [type]: true,
        }));
        setPage((prevState) => ({
            ...prevState,
            [type]: page,
        }));
    };

    return (
        <Dashboard auth={props.auth} totalNotify={props.totalNotify}>
            <Head title="Permohonan | Sipelaku Sosial" />
            <div className="dashboard-content min-h-full">
                <Tabs
                    defaultIndex={defaultIndex}
                    selectedTabClassName="custom-tab--selected"
                    selectedTabPanelClassName="custom-tab-panel--selected"
                >
                    <TabList className="custom-tab-list">
                        <Tab className="custom-tab">
                            <p className="text-sm md:text-base">
                                Belum Diperiksa
                            </p>
                        </Tab>
                        <Tab className="custom-tab">
                            <p className="text-sm md:text-base">
                                Riwayat Pemeriksaan
                            </p>
                        </Tab>
                    </TabList>
                    <TabPanel className="custom-tab-panel">
                        <DataTable
                            selectableRowDisabled
                            data={dataLks.notChecked.data}
                            columns={LksNotCheckedColumn.apply(null, [
                                page.notChecked,
                            ])}
                            striped
                            progressPending={isLoading.notChecked}
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
                                    Belum ada data untuk diperiksa.
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
                            paginationTotalRows={dataLks.notChecked.total}
                            onChangePage={(page) =>
                                handleInput(page, "notChecked")
                            }
                        />
                    </TabPanel>
                    <TabPanel className="custom-tab-panel">
                        <DataTable
                            data={dataLks.checked.data}
                            striped
                            progressPending={isLoading.checked}
                            columns={LksCheckedColumn.apply(null, [
                                page.checked,
                            ])}
                            noDataComponent={
                                <div className="flex h-datable p-2 h-full flex-col justify-center items-center">
                                    <img
                                        draggable="false"
                                        className="w-32 select-none mt-20 mb-2"
                                        src={emptySvg}
                                        alt="empty-svg"
                                    />
                                    <strong className="text-lg text-primary-800">
                                        Data belum ada
                                    </strong>
                                    Belum ada data yang sudah diperiksa.
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
                            paginationTotalRows={dataLks.checked.total}
                            onChangePage={(page) =>
                                handleInput(page, "checked")
                            }
                        />
                    </TabPanel>
                </Tabs>
            </div>
        </Dashboard>
    );
};

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

export default Permohonan;
