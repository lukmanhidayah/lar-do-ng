import React, { useEffect, useState } from "react";
import Dashboard from "@/Layouts/Dashboard";
import { Head } from "@inertiajs/inertia-react";
import config from "@/config";
import AktivitasItem from "@/Components/Dashboard/AktivitasItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/Components/Spinner";
import ArrowDownIcon from "@/Icon/ArrowDownIcon";
import axios from "axios";
import listSvg from "@/Assets/Images/list.svg";

const AktivitasWithId = (props) => {
    const [data, setData] = useState([]);

    const [page, setPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getData(page);
    }, [page]);

    const getData = (page) => {
        axios
            .get(
                config.base_url +
                    `/aktivitas?page=${page}&url_slug=${props.url_slug}`,
                {
                    auth: {
                        username: "sipelaku",
                        password: "d1ns0sBDG2020",
                    },
                }
            )
            .then((res) => {
                if (res.data.data.length > 0) {
                    setData((prevState) => [...prevState, ...res.data.data]);
                } else {
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                if (err) {
                    setIsLoading(false);
                }
            });
    };

    const fetchMoreData = () => {
        setPage((prevState) => prevState + 1);
    };

    const goBack = () => {
        window.history.back();
    };
    return (
        <Dashboard
            auth={props.auth}
            totalNotify={props.totalNotify}
            imageUrl={props?.identity?.logo}
        >
            <Head title="Dashboard | Sipelaku Sosial" />
            <div className="w-full">
                <div className="text-xl font-bold mb-5 px-2 flex items-center">
                    <div
                        onClick={goBack}
                        className="transform rotate-90 cursor-pointer mr-2"
                    >
                        <ArrowDownIcon width={32} height={32} />
                    </div>
                    <span onClick={goBack} className="cursor-pointer">
                        Aktivitas
                    </span>
                </div>
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchMoreData}
                    hasMore={isLoading}
                    loader={
                        <div className="w-full flex justify-center items-center py-5">
                            <Spinner
                                width={52}
                                height={52}
                                strokeWidth={3}
                                type="primary-spinner"
                            />
                        </div>
                    }
                >
                    {data.map((res) => {
                        return (
                            <div className="px-2" key={res.id}>
                                <AktivitasItem
                                    url_slug={props.url_slug}
                                    id={res.id}
                                    imageUrl={config.drive_url + res.foto}
                                    title={res.title}
                                    name={res.name}
                                    desc={res.deksripsi}
                                    sasaran={res.sasaran}
                                    totalAnggaran={res.total_anggaran}
                                    peserta={res.jumlah}
                                    tempat={res.tempat}
                                    narasumber={res.narasumber}
                                    tujuan={res.tujuan}
                                    tanggal={res.tanggal}
                                />
                            </div>
                        );
                    })}
                </InfiniteScroll>
            </div>
            {!isLoading && data.length == 0 && (
                <div className="flex p-2 flex-col justify-center items-center">
                    <img
                        draggable="false"
                        className="w-24 select-none mt-10 mb-2"
                        src={listSvg}
                        alt="list-svg"
                    />
                    <strong className="text-lg text-primary-800">
                        Aktivitas belum ada
                    </strong>
                    Belum ada aktivitas yang dilakukan yayasan ini.
                </div>
            )}
        </Dashboard>
    );
};

export default AktivitasWithId;
