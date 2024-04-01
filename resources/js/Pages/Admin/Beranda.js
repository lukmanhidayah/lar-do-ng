import React from "react";
import Dashboard from "@/Layouts/Dashboard";
import { Head } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";
import FileIcon from "@/Icon/FileIcon";
import ApproveIcon from "@/Icon/ApproveIcon";
import UndoIcon from "@/Icon/UndoIcon";
import PendingIcon from "@/Icon/PendingIcon";
import CalendarIcon from "@/Icon/CalendarIcon";
import ChartIcon from "@/Icon/ChartIcon";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

export default function Beranda(props) {
    const data = {
        labels: props.chart.name,
        datasets: [
            {
                data: props.chart.total,
                backgroundColor: "#eff6ff",
                borderColor: "#1d75c6",
                borderWidth: 0.5,
            },
        ],
    };

    const maxValue = Math.max(...props.chart.total);

    const summary = props.summary;
    return (
        <Dashboard auth={props.auth} totalNotify={props.totalNotify}>
            <Head title="Dashboard | Sipelaku Sosial" />
            <div className="dashboard-content min-h-full">
                <div className="gap-8 pb-8 summary-container">
                    <Link href={route('permohonan')} className="item">
                        <div className="p-2 bg-blue-10 flex justify-center items-center w-full h-1/2">
                            <FileIcon />
                        </div>
                        <div className="p-4">
                            <div className="uppercase text-xs text-gray-500">
                                Permohonan Baru
                            </div>
                            <div className="font-bold text-4xl">
                                {summary[0].total}
                            </div>
                        </div>
                    </Link>
                    <div className="item">
                        <div className="p-2 bg-blue-10 flex justify-center items-center w-full h-1/2">
                            <ApproveIcon />
                        </div>
                        <div className="p-4">
                            <div className="uppercase text-xs text-gray-500">
                                Terverifikasi
                            </div>
                            <div className="font-bold text-4xl">
                                {summary[1].total}
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="p-2 bg-blue-10 flex justify-center items-center w-full h-1/2">
                            <UndoIcon />
                        </div>
                        <div className="p-4">
                            <div className="uppercase text-xs text-gray-500">
                                Revisi
                            </div>
                            <div className="font-bold text-4xl">
                                {summary[2].total}
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="p-2 bg-blue-10 flex justify-center items-center w-full h-1/2">
                            <PendingIcon />
                        </div>
                        <div className="p-4">
                            <div className="uppercase text-xs text-gray-500">
                                Disetujui
                            </div>
                            <div className="font-bold text-4xl">
                                {summary[3].total}
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="p-2 bg-blue-10 flex justify-center items-center w-full h-1/2">
                            <CalendarIcon />
                        </div>
                        <div className="p-4">
                            <div className="uppercase text-xs text-gray-500">
                                Non-Aktif
                            </div>
                            <div className="font-bold text-4xl">
                                {summary[4].total}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white w-full flex flex-col items-center justify-between overflow-hidden relative rounded-md shadow dashboard-district-container">
                    <div className="w-full flex items-start justify-between">
                        <div>
                            <div>Jumlah LKS yang disetujui</div>
                            <div className="text-xs text-gray-500 flex gap-x-2">
                                <ChartIcon
                                    width="16"
                                    height="16"
                                    className="stroke-current"
                                />
                                Data Setiap Kecamatan
                            </div>
                        </div>
                        <div className="text-primary-600 font-bold text-lg">
                            {summary[3].total}
                        </div>
                    </div>
                    <div className="w-full overflow-auto relative">
                        <Bar
                            className="w-768 md:w-full h-full"
                            data={data}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: {
                                        beginAtZero: true,
                                        suggestedMax: function () {
                                            switch (true) {
                                                case maxValue < 10:
                                                    return 10;
                                                case maxValue < 100:
                                                    return 100;
                                                case maxValue < 1000:
                                                    return 1000;
                                                case maxValue < 10000:
                                                    return 10000;
                                                default:
                                                    return 100000;
                                            }
                                        },
                                    },
                                    xAxes: {
                                        display: false,
                                    },
                                },
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: function (tooltipItem) {
                                                let data = parseFloat(
                                                    tooltipItem.formattedValue
                                                );
                                                if (data < 1) {
                                                    data = 0;
                                                }
                                                return `${data}`;
                                            },
                                        },
                                    },
                                    legend: {
                                        display: false,
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}
