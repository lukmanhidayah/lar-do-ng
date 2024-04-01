import { Link } from "@inertiajs/inertia-react";
import indonesia from "date-fns/locale/id";
import format from "date-fns/format";

const LksListColumn = (page) => [
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
        name: "Masa Berlaku",
        selector: (row) =>
            format(new Date(row.expire_date), "dd MMMM yyyy", {
                locale: indonesia,
            }),
        grow: 2,
        sortable: true,
    },
    {
        name: "Aktivitas terakhir",
        center: true,
        selector: (row) => {
            if (row.last_update_activity)
                return (
                    <span>
                        {format(
                            new Date(row.last_update_activity),
                            "dd MMMM yyyy",
                            {
                                locale: indonesia,
                            }
                        )}
                    </span>
                );
            return <p className="bg-red-100 text-red-900 font-semibold py-2 px-4 rounded-full">Belum ada aktivitas</p>;
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
            return (
                <Link
                    type="buttons"
                    className="bg-primary-600 active:bg-primary-800 py-2 px-4 rounded shadow text-white font-bold"
                    href={route("aktivitas/url_slug", row.url_slug)}
                >
                    Lihat
                </Link>
            );
        },
    },
];
export default LksListColumn;
