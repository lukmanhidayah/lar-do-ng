import React, { useRef } from "react";

const ButtonUnggah = ({
    data = null,
    accept,
    onHandleChange,
    id,
    onViewHandle,
}) => {
    const fileRef = useRef(null);

    return (
        <div className="flex gap-4 items-center justify-center">
            <input
                ref={fileRef}
                type="file"
                name={id}
                accept={accept}
                className="hidden"
                onChange={onHandleChange}
            />
            <button
                onClick={onViewHandle}
                disabled={data == null}
                className={`${
                    data === null
                        ? "bg-gray-300 active:bg-gray-300"
                        : "bg-primary-600 active:bg-primary-800"
                } py-1 px-3 rounded shadow text-white font-bold`}
            >
                Lihat
            </button>
            <button
                onClick={() => fileRef.current.click()}
                className="flex items-center bg-green-500 active:bg-green-800 py-1 px-3 rounded shadow text-white font-bold"
            >
                Unggah
            </button>
        </div>
    );
};

export default ButtonUnggah;
