import { Link } from "@inertiajs/inertia-react";
import indonesia from "date-fns/locale/id";
import format from "date-fns/format";

const ConsumerAppColumn = (page, onEdit, onDelete) => [
    {
        name: "No.",
        selector: (_, index) => 10 * (page - 1) + (index + 1),
        grow: 0,
        sortable: false,
    },
    {
        name: "Username",
        selector: (row) => row.username,
        grow: 2,
        sortable: true,
        style: {
            fontWeight: 600,
        },
    },
    {
        name: "Password",
        selector: (row) => row.password,
        grow: 2,
        sortable: true,
        style: {
            fontWeight: 600,
        },
    },
    {
        name: "Deskirpsi",
        selector: (row) => row.description,
        grow: 2,
        sortable: true,
    },
    {
        name: "Created At",
        selector: (row) =>
            format(new Date(row.created_at), "dd MMMM yyyy", {
                locale: indonesia,
            }),
        grow: 1,
        sortable: true,
    },
    {
        name: "Aksi",
        grow: 4,
        sortable: false,
        center: true,
        cell: (row) => {
            return (
                <div className="w-full flex flex-wrap py-4 items-center justify-center gap-4">
                    <>
                        <button
                            disabled={row.id == 1}
                            onClick={() => onEdit(row)}
                            type="button"
                            className={`${
                                row.id == 1
                                    ? "bg-gray-600 active:bg-gray-600 cursor-not-allowed"
                                    : "bg-green-600 active:bg-green-800"
                            } py-2 px-4 w-20 rounded shadow text-white font-bold`}
                        >
                            Edit
                        </button>
                        <button
                            disabled={row.id == 1}
                            onClick={() => onDelete(row)}
                            type="button"
                            className={`${
                                row.id == 1
                                    ? "bg-gray-600 active:bg-gray-600 cursor-not-allowed"
                                    : "bg-red-600 active:bg-red-800"
                            } py-2 px-4 w-20 rounded shadow text-white font-bold`}
                        >
                            Delete
                        </button>
                    </>
                </div>
            );
        },
    },
];
export default ConsumerAppColumn;
