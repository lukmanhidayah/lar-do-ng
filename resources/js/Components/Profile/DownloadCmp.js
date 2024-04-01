import config from "@/config";
import DownloadIcon from "@/Icon/DownloadIcon";
import React from "react";
import { saveAs } from "file-saver";

const DownloadCmp = ({ file }) => {
    return (
        <div
            onClick={() => {
                saveAs(config.drive_url + file, "tanda-daftar-yayasan.pdf");
            }}
            className={
                " bg-white w-4/6 rounded-md tranlate cursor-pointer group px-3 flex items-center justify-start border mt-5"
            }
        >
            <div className="border-r px-4 py-2">
                <DownloadIcon width={24} height={24} />
            </div>
            <div className="py-2 px-2">
                <p className="text-primary-800 text-sm font-bold">Unduh</p>
                <p className="text-primary-800 text-sm font-semibold -mt-1">
                    Tanda Daftar Yayasan
                </p>
            </div>
        </div>
    );
};

export default DownloadCmp;
