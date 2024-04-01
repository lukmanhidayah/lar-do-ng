import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const NotifyItem = ({
    id,
    fromId,
    simpleName,
    name,
    email,
    date,
    message,
    status,
    user_id,
}) => {
    const [statusNotif, setStatusNotif] = useState(status)
    const markRead = () => {
        Inertia.post(
            "update-notification",
            {
                from_id: fromId,
                user_id: user_id,
                id: id,
            },
            {
                onSuccess: (_) => {
                    setStatusNotif(false)
                },
            }
        );
    };
    return (
        <div
            type="button"
            onClick={markRead}
            className="px-2 md:px-4 flex justify-between gap-x-4 mb-4 cursor-pointer"
        >
            <div className="message-thumbnail hidden md:flex justify-center items-center bg-white shadow rounded-full font-bold">
                {simpleName}
            </div>
            <div className="message-bar p-4 bg-white shadow rounded border">
                <div className="relative flex md:block items-center gap-x-4 border-b md:border-b-0 pb-2 border-gray-200">
                    <div className="message-thumbnail flex md:hidden justify-center items-center bg-white shadow rounded font-bold">
                        {simpleName}
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-between items-start md:pb-2 md:border-b md:border-gray-200">
                        <div>
                            <div className="font-bold">{name}</div>
                            <div
                                className={` ${
                                    fromId != 1 && fromId != 2
                                        ? "block"
                                        : "hidden"
                                } text-xs text-gray-500`}
                            >
                                {email}
                            </div>
                        </div>
                        <div className="text-xs flex gap-x-2 items-center">
                            {statusNotif == 1 && (
                                <span className="hidden md:block w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                            <div className="text-gray-500 font-bold">
                                {date}
                            </div>
                        </div>
                    </div>
                    {statusNotif == 1 && (
                        <span className="absolute md:hidden w-2 h-2 bg-red-500 rounded-full right-2"></span>
                    )}
                </div>
                <div className="w-full mt-2">
                    <div className="text-md text-gray-800">{message}</div>
                </div>
            </div>
        </div>
    );
};

export default NotifyItem;
