import React, { useEffect, useState } from "react";
import Dashboard from "@/Layouts/Dashboard";
import { Head } from "@inertiajs/inertia-react";
import "@/Assets/Css/notification.css";
import axios from "axios";
import config from "@/config";
import InfiniteScroll from "react-infinite-scroll-component";
import indonesia from "date-fns/locale/id";
import format from "date-fns/format";
import Spinner from "@/Components/Spinner";
import NotifyItem from "@/Components/Dashboard/NotifyItem";
import notifSvg from "@/Assets/Images/notif.svg";
import ArrowDownIcon from "@/Icon/ArrowDownIcon";

export default function Notification(props) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMark, setIsLoadingMark] = useState(false);
    const [page, setPage] = useState(0);
    const [isMarkAllAsRead, setIsMarkAllAsRead] = useState(false);

    useEffect(() => {
        if (page > 0) {
            getNotification(page, props.auth.user.id);
        } else {
            setPage(1);
        }
    }, [page]);

    const getNotification = (page, id) => {
        axios
            .get(config.base_url + `/notif?page=${page}&id=${id}`, {
                auth: {
                    username: "sipelaku",
                    password: "d1ns0sBDG2020",
                },
            })
            .then((res) => {
                setIsMarkAllAsRead(res.data.mark_as_read_action);
                if (res.data.data.length > 0) {
                    setData((prevState) => [...prevState, ...res.data.data]);
                } else {
                    setIsLoading(false);
                }
                setIsLoadingMark(false);
            })
            .catch((err) => {
                if (err) {
                    setIsLoading(false);
                    setIsLoadingMark(false);
                }
            });
    };

    const simpleName = (name) => {
        const tempName = name.split(" ");
        if (tempName.length > 1) {
            return (
                tempName[0].substring(0, 1) +
                "" +
                tempName[1].substring(0, 1)
            ).toUpperCase();
        }
        return tempName[0].substring(0, 2).toUpperCase();
    };

    const fetchMoreData = () => {
        setPage((prevState) => prevState + 1);
    };

    const makeAllAsRead = (id) => {
        setIsLoadingMark(true);
        axios
            .post(config.base_url + `/update_notif?id=${id}`, {
                auth: {
                    username: "sipelaku",
                    password: "d1ns0sBDG2020",
                },
            })
            .then((res) => {
                if (res.data.code == 200) {
                    setIsLoading(true);
                    setPage(0);
                    setData([]);
                }
            })
            .catch((err) => {
                console.log(err);
                setIsLoadingMark(false);
            });
    };

    const goBack = () => {
        window.history.back();
    };

    return (
        <Dashboard auth={props.auth} imageUrl={props?.identity?.logo}>
            <Head title="Notifikasi | Sipelaku Sosial" />
            <div className="w-full">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 px-2">
                    <div className="text-xl font-bold mb-5 flex items-center">
                        <div
                            onClick={goBack}
                            className="transform rotate-90 cursor-pointer mr-2"
                        >
                            <ArrowDownIcon width={32} height={32} />
                        </div>
                        <span onClick={goBack} className="cursor-pointer">
                            Notifikasi
                        </span>
                    </div>
                    {isMarkAllAsRead && (
                        <button
                            onClick={() => makeAllAsRead(props.auth.user.id)}
                            disabled={isLoadingMark}
                            className={`flex items-center h-10 w-full md:w-60 justify-center bg-primary-600 active:bg-primary-800 py-2 px-4 rounded shadow text-white font-semibold mr-2 ${
                                isLoadingMark && "opacity-75"
                            }`}
                        >
                            {isLoadingMark ? (
                                <Spinner width={16} height={16} />
                            ) : (
                                "Tandai sudah dibaca semua"
                            )}
                        </button>
                    )}
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
                            <NotifyItem
                                id={res.id}
                                user_id={props.auth.user.id}
                                key={res.id}
                                fromId={res.user_id}
                                date={format(
                                    new Date(res.created_at),
                                    "HH:mm, dd MMM yyyy",
                                    {
                                        locale: indonesia,
                                    }
                                )}
                                status={res.status_id}
                                simpleName={simpleName(res.name)}
                                name={res.name}
                                email={res.email}
                                message={res.message}
                            />
                        );
                    })}
                </InfiniteScroll>
            </div>
            {!isLoading && data.length == 0 && (
                <div className="flex p-2 flex-col justify-center items-center">
                    <img
                        draggable="false"
                        className="w-32 select-none mt-10 mb-2"
                        src={notifSvg}
                        alt="empty-svg"
                    />
                    <strong className="text-lg text-primary-800">
                        Notifikasi belum ada
                    </strong>
                    Belum ada notifikasi yang dikirim untuk Anda.
                </div>
            )}
        </Dashboard>
    );
}
