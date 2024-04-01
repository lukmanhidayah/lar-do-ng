import { Link } from "@inertiajs/inertia-react";

const LksNotCheckedColumn = (page) => [
    {
        name: "No.",
        selector: (_, index) => 10 * (page - 1) + (index + 1),
        grow: 0,
        sortable: false,
        style: {
            fontWeight: 600
        }
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
        name: "Aksi",
        grow: 1,
        sortable: false,
        center: true,
        cell: (row) => {
            return (
                <Link
                    type="buttons"
                    className="bg-primary-600 active:bg-primary-800 py-2 px-4 rounded shadow text-white font-bold"
                    href={route("permohonan/id", row.id)}
                >
                    Periksa Data
                </Link>
            );
        },
    },
];
export default LksNotCheckedColumn;
