import CloseIcon from "@/Icon/CloseIcon";
import React from "react";

const MessageModal = ({ message, onResetMessage }) => {
    return (
        <>
            {message.show && (
                <div
                    className={`fixed top-24 right-6 z-100 max-w-sm  ${
                        message.error ? "bg-red-50" : "bg-green-50"
                    } px-5 py-3 rounded shadow animate-bounce-in`}
                >
                    <div
                        className="absolute -right-1 -top-1 cursor-pointer bg-white rounded-full shadow"
                        onClick={onResetMessage}
                    >
                        <CloseIcon
                            className={`stroke-current ${
                                message.error
                                    ? "text-red-600"
                                    : "text-green-600"
                            }`}
                        />
                    </div>
                    <div
                        className={`font-medium font-bold ${
                            message.error ? "text-red-600" : "text-green-600"
                        }`}
                    >
                        {message.error
                            ? "Notifikasi Gagal"
                            : "Notifikasi Sukses"}
                    </div>
                    <span
                        className={`text-sm ${
                            message.error ? "text-red-600" : "text-green-600"
                        }`}
                    >
                        {message.message}
                    </span>
                </div>
            )}
        </>
    );
};

export default MessageModal;
