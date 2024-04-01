import { Link } from "@inertiajs/inertia-react";
import indonesia from "date-fns/locale/id";
import format from "date-fns/format";

const LksLKSColumn = (page) => [
    {
        name: "No.",
        selector: (_, index) => 10 * (page - 1) + (index + 1),
        grow: 0,
        sortable: false,
    },
    {
        name: "Nama LKS",
        selector: (row) => row.name,
        grow: 2,
        sortable: true,
        style: {
            fontWeight: 600,
        },
    },
    {
        name: "Tanggal Expire",
        selector: (row) =>
            format(new Date(row.expire_date), "dd MMMM yyyy", {
                locale: indonesia,
            }),
        grow: 2,
        sortable: true,
    },
    {
        name: "Status",
        center: true,
        selector: (row) => {
            return (
                <p
                    className={`${
                        row.status_id == 5
                            ? "bg-blue-100 text-blue-900"
                            : "bg-red-100 text-red-900"
                    } font-semibold py-2 px-4 rounded-full`}
                >
                    {row.status_name}
                </p>
            );
        },
        grow: 3,
        sortable: true,
    },
    {
        name: "Aksi",
        grow: 1,
        sortable: false,
        center: true,
        cell: (row) => {
            return row.status_id == 6 || row.status_id == 5 ? (
                <Link
                    type="buttons"
                    className="bg-primary-600 active:bg-primary-800 py-2 px-4 rounded shadow text-white font-bold"
                    href={route("daftar-lks/url_slug", row.url_slug)}
                >
                    Lihat
                </Link>
            ) : (
                <p className="bg-gray-600 cursor-not-allowed py-2 px-4 rounded shadow text-white font-bold">
                    Lihat
                </p>
            );
        },
    },
];
export default LksLKSColumn;
