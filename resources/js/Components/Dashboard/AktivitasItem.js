import React from "react";
import indonesia from "date-fns/locale/id";
import format from "date-fns/format";
import { Link } from "@inertiajs/inertia-react";

const AktivitasItem = ({
    name,
    title,
    desc,
    imageUrl,
    sasaran,
    peserta,
    totalAnggaran,
    narasumber,
    tempat,
    tujuan,
    tanggal,
    url_slug,
    id,
}) => {
    return (
        <Link
            href={route("detail-aktivitas/id", {
                id: id,
            })}
            className="w-full lg:max-w-full lg:flex bg-white shadow rounded mb-5 overflow-hidden cursor-pointer"
        >
            <div
                className="h-52 relative lg:h-auto w-full border-b border-gray-100 lg:border-b-0 lg:w-48 flex-none bg-cover lg:rounded-t rounded-t-none lg:rounded-l rounded-l-none text-center overflow-hidden bg-blue-10"
                style={{
                    backgroundImage: `url('${imageUrl}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}
                title="img-aktivitas"
            >
                <div className="absolute top-4 right-4 rounded-full bg-blue-100 py-1 px-2 bg-opacity-50  lg:hidden">
                    <p className="text-sm text-gray-800 font-semibold md:font-normal">
                        {format(new Date(tanggal), "dd MMMM yyyy", {
                            locale: indonesia,
                        })}
                    </p>
                </div>
            </div>
            <div className="bg-white p-4 w-full flex flex-col justify-between leading-normal border-l border-blue-10">
                <div className="mb-8">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-gray-600 flex items-center">
                                {name}
                            </p>
                            <div className="text-gray-900 font-bold text-xl">
                                {title}
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <p className="text-gray-700 text-sm">
                                {format(new Date(tanggal), "dd MMMM yyyy", {
                                    locale: indonesia,
                                })}
                            </p>
                        </div>
                    </div>
                    <div className="text-gray-700 mt-2">
                        <p>{desc}</p>
                        <p className="text-sm">Tujuan: {tujuan}</p>
                        <p className="text-sm">
                            Total Anggaran: Rp
                            {totalAnggaran.toLocaleString("ID")}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-start border-t lg:border-t-0 border-gray-100 pt-2 lg:pt-0 -mt-6">
                    <div className="text-xs text-center rounded mr-2">
                        <p className="text-gray-900 py-1 px-4  bg-blue-10 rounded-full mt-1">
                            Sasaran <strong>{sasaran}</strong>
                        </p>
                    </div>
                    <div className="text-xs text-center rounded mr-2">
                        <p className="text-gray-900 py-1 px-4  bg-blue-10 rounded-full mt-1">
                            Diikuti <strong>{peserta}</strong> orang
                        </p>
                    </div>
                    <div className="text-xs text-center rounded mr-2">
                        <p className="text-gray-900 py-1 px-4  bg-blue-10 rounded-full mt-1">
                            Tempat <strong>{tempat}</strong>
                        </p>
                    </div>
                    <div className="text-xs text-center rounded mr-2">
                        <p className="text-gray-900 py-1 px-4  bg-blue-10 rounded-full mt-1">
                            Narasumber <strong>{narasumber}</strong>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AktivitasItem;
