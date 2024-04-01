import indonesia from "date-fns/locale/id";
import format from "date-fns/format";

const LksCheckedColumn = (page) => [
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
        name: "Tanggal Pemeriksaan",
        selector: (row) =>
            format(new Date(row.created_at), "dd MMMM yyyy", {
                locale: indonesia,
            }),
        grow: 2,
        sortable: true,
        style: {
            fontWeight: 600,
        },
    },
    {
        name: "Status",
        grow: 1,
        sortable: false,
        center: true,
        cell: (row) => {
            return (
                <div
                    className={`${
                        row.status_id == 4
                            ? "bg-red-100 text-red-900"
                            : "bg-blue-100 text-blue-900"
                    } font-semibold py-2 px-4 rounded-full`}
                >
                    {row.status_name}
                </div>
            );
        },
    },
];
export default LksCheckedColumn;
