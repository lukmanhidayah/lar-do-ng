import React from "react";

const StatusUnggah = ({ data = null, userStatus }) => {
    return (
        <span
            className={`px-3 py-2 font-semibold leading-tight rounded-full ${
                data === null
                    ? "text-red-700 bg-red-50 "
                    : "text-green-700 bg-green-100 animate-bounce-in"
            }`}
        >
            {data === null
                ? userStatus == 4
                    ? "Revisi"
                    : "Belum diunggah"
                : "Sudah diunggah"}
        </span>
    );
};

export default StatusUnggah;
