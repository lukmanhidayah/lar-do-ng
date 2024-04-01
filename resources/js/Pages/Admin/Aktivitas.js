import React, { useEffect, useState } from "react";
import Dashboard from "@/Layouts/Dashboard";
import { Head } from "@inertiajs/inertia-react";
import config from "@/config";
import DataTable from "react-data-table-component";
import LksActivityColumn from "@/Components/Column/LksActivityColumn";
import Spinner from "@/Components/Spinner";
import emptySvg from "@/Assets/Images/empty.svg";
import axios from "axios";

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

const Aktivitas = (props) => {
    const [dataLks, setDataLks] = useState({
        total: 0,
        data: [],
    });

    const [page, setPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        getData(page, searchText);
    }, [page, searchText]);

    const getData = (page, searchText) => {
        axios
            .get(
                config.base_url +
                    `/lks/simple?page=${page}&status=5&name=${searchText}`,
                {
                    auth: {
                        username: "sipelaku",
                        password: "d1ns0sBDG2020",
                    },
                }
            )
            .then((res) => {
                setDataLks((prevState) => ({
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

    const handleInputChangeNotChecked = (page) => {
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

    return (
        <Dashboard auth={props.auth} totalNotify={props.totalNotify}>
            <Head title="Dashboard | Sipelaku Sosial" />
            <div className="dashboard-content min-h-full">
                <div className="bg-white w-full overflow-hidden h-full relative rounded-md shadow">
                    <div className="pt-5 pb-1 px-5  flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="font-semibold text-lg mb-2 md:mb-0 ">
                            Lembaga Kesejahteraan Sosial (LKS){" "}
                        </div>
                        <div className="border w-full md:w-1/3 border-gray-300 rounded">
                            <input
                                placeholder="Cari nama lks..."
                                onChange={handleSearchInput}
                                className="p-3 placeholder-gray-500 border-none text-black rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 w-full border"
                            />
                        </div>
                    </div>
                    <div className="min-h-content-table flex flex-col justify-between ">
                        <DataTable
                            selectableRowDisabled
                            data={dataLks.data}
                            columns={LksActivityColumn.apply(null, [page])}
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
                                    Belum ada data lembaga kesejahteraan sosial.
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
                            onChangePage={handleInputChangeNotChecked}
                        />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default Aktivitas;
